import { SerialPort } from "serialport";
import { TransmissionPacket } from "./TransmissionPacket";

export class SignClient {
    private readonly DEFAULT_BAUD_RATE = 9600;
    serial?: SerialPort;
    comPort: string;
    baudRate: number;

    constructor(comPort: string, baudRate?: number) {
        this.comPort = comPort;
        this.baudRate = baudRate || this.DEFAULT_BAUD_RATE;
    }

    async connect(): Promise<SignClient> {
        return new Promise<SignClient>((resolve, reject) => {
            this.serial = new SerialPort({path: this.comPort, baudRate: this.baudRate}, (err) => {
                if (err === null) { resolve(this); return; }
                this.serial = undefined;
                reject(err);
            });
        });
    }

    async send(packet: TransmissionPacket): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.serial === undefined) { reject("Serial port not initialized"); return; }
            this.serial.write(packet.toBuffer(), (err) => {
                if (err === undefined) { resolve(); return; }
                reject(err);
            });
        });
    }

    isOpen(): boolean {
        return this.serial?.isOpen || false;
    }
}

