import { SerialPort } from "serialport";
import { TransmissionPacket } from "./TransmissionPacket";
import { Response } from "./commands/Response";
import { ResponseFactory, ResponseFactoryError, ResponseFactoryErrorCode } from "./commands/ResponseFactory";
import { Chars } from "./types";
import { SerialPortStream } from "@serialport/stream";
import { BindingInterface } from '@serialport/bindings-interface';

export class SignClient {
    private readonly DEFAULT_BAUD_RATE = 9600;
    private readonly TIMEOUT = 5000;

    serial?: SerialPortStream;
    comPort: string;
    baudRate: number;

    private binding?: BindingInterface;
    private timeout?: NodeJS.Timeout;
    signClient: any;

    constructor(comPort: string, baudRate?: number, binding?: BindingInterface) {
        this.comPort = comPort;
        this.baudRate = baudRate || this.DEFAULT_BAUD_RATE;
        this.binding = binding;
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
            let buf = Buffer.from([]);
            if (packet.expectsResponse) {
                this.serial.on('data', (data) => {
                    if (data[data.length-1] === Chars.END_OF_TRANSMISSION) {
                        buf = Buffer.concat([buf, data]);
                        if (this.timeout !== undefined) { clearTimeout(this.timeout); }
                        try {
                            this.serial?.removeAllListeners('data');
                            resolve(ResponseFactory.parse(buf) as T);
                            return;
                        }
                        catch (err) {
                            this.serial?.removeAllListeners('data');
                            if (err instanceof ResponseFactoryError) {
                                switch (err.code) {
                                    case ResponseFactoryErrorCode.INVALID_PACKET:
                                        resolve(undefined as unknown as T);
                                        return;
                                }
                            }
                            reject(err);
                            return;
                        }
                    }
                    buf = Buffer.concat([buf, data]);
                });
            } 
            this.serial.write(packet.toBuffer(), (err) => {
                if (err !== undefined) { reject(err); return; }
                
                if (packet.expectsResponse) { 
                    this.timeout = setTimeout(() => {
                        this.serial?.removeAllListeners('data');
                        reject("Timeout");
                        return;
                    }, this.TIMEOUT);
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

