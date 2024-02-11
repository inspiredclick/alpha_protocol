import { SerialPort } from "serialport";
import { TransmissionPacket } from "./TransmissionPacket";
import { Response } from "./commands/Response";
import { ResponseFactory } from "./commands/ResponseFactory";
import { Chars } from "./types";
import { SerialPortStream } from "@serialport/stream";
import { BindingInterface } from '@serialport/bindings-interface';
import { Transform, TransformCallback } from "stream";

class SignClientResponseParser extends Transform {
    private readonly PACKET_START_BYTE_COUNT = 20;
    private readonly PACKET_START = Buffer.from(Array(this.PACKET_START_BYTE_COUNT).fill(Chars.NULL));
    private dataBuffer: Buffer;
    private inPacket: boolean = false;

    constructor() {
        super();

        this.dataBuffer = Buffer.from([]);
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        this.dataBuffer = Buffer.concat([this.dataBuffer, chunk])
        if (this.dataBuffer.includes(this.PACKET_START) && !this.inPacket) {
            const startHeaderIndex = this.dataBuffer.indexOf(Chars.START_OF_HEADER);
            this.dataBuffer = this.dataBuffer.subarray(startHeaderIndex - this.PACKET_START_BYTE_COUNT);
            this.inPacket = true;
        }
        else if (this.dataBuffer.includes(Chars.END_OF_TRANSMISSION) && this.inPacket) {
            this.push(this.dataBuffer);
            this.dataBuffer = Buffer.from([]);
            this.inPacket = false;
        }
        callback();
    }
}

export class SignClient {
    private readonly DEFAULT_BAUD_RATE = 9600;
    private readonly DEFAULT_TIMEOUT = 5000;

    comPort: string;
    baudRate: number;
    serial?: SerialPortStream;
    parser?: SignClientResponseParser;

    private binding?: BindingInterface;
    private timeoutMs: number = this.DEFAULT_TIMEOUT;
    private timeout?: NodeJS.Timeout;

    constructor(comPort: string, baudRate?: number, binding?: BindingInterface, timeout?: number) {
        this.comPort = comPort;
        this.baudRate = baudRate || this.DEFAULT_BAUD_RATE;
        this.binding = binding;
        this.timeoutMs = timeout || this.DEFAULT_TIMEOUT;
    }

    async connect(): Promise<SignClient> {
        return new Promise<SignClient>((resolve, reject) => {
            this.serial = new SerialPortStream({
                binding: this.binding || SerialPort.binding,
                path: this.comPort, 
                baudRate: this.baudRate
            }, (err) => {
                if (err !== null) { 
                    this.serial = undefined;
                    reject(err); 
                    return; 
                }
                this.parser = this.serial?.pipe(new SignClientResponseParser());
                resolve(this);
                return;
            });
            
        });
    }

    async send<T extends Response>(packet: TransmissionPacket): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            if (this.serial === undefined) { 
                throw new Error("Serial port is not open");
            }
            if (packet.expectsResponse) {
                const responseListener = this.parser?.on('data', async (data) => {
                    responseListener?.removeAllListeners();
                    clearTimeout(this.timeout as NodeJS.Timeout);
                    this.timeout = undefined;
                    try {
                        const response = await ResponseFactory.parse(data);
                        resolve(response as T);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
                const errorListener = this.parser?.on('error', (err) => {
                    errorListener?.removeAllListeners();
                    reject(err);
                });
            } 
            this.serial.write(packet.toBuffer(), (err) => {
                if (err) { 
                    reject(err); 
                    return; 
                }
                
                if (packet.expectsResponse) { 
                    this.timeout = setTimeout(() => {
                        this.serial?.removeAllListeners('data');
                        reject("Timeout");
                        return;
                    }, this.timeoutMs);
                    return; 
                }

                resolve(undefined as unknown as T);
                return;
            });
        });
    }

    isOpen(): boolean {
        return this.serial?.isOpen || false;
    }
}

