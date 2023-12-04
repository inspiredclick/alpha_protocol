import {afterAll, describe, expect, jest, test} from '@jest/globals';
import { SignClient } from './SignClient';
import { SerialPort } from 'serialport';
import { TransmissionPacket } from './TransmissionPacket';
import { CommandCode, FileLabels } from './types';
import { SerialPortStream } from '@serialport/stream';
import { MockBinding } from '@serialport/binding-mock';
import { ReadTextFileResponse } from './commands/TextFile/ReadTextFileResponse';
import { ReadTextFileCommand } from './commands/ReadTextFileCommand';

class TestTransmissionPacket extends TransmissionPacket {
    commandCode: CommandCode = CommandCode.WRITE_TEXT_FILE;
    constructor(expectsResponse: boolean = false) {
        super();
        this.expectsResponse = expectsResponse;
    }
}

const samplePacket = [
    0,  0,  0,   0,   0,   1,  90,  48, 48,  2, 66, 65,
    4,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   1,  48,  48,  48,   2, 65, 65, 27, 32,
  111, 28, 67, 104, 101, 108, 108, 111,  3, 48, 51, 65,
   52,  4
];

describe('SignClient', () => {
    beforeEach(() => {
        MockBinding.createPort('/dev/serial1', { echo: true, record: true })
    });

    afterEach(() => {
        MockBinding.reset();
    });

    test('should connect', async () => {
        const signClient = new SignClient('/dev/serial1', undefined, MockBinding);
        await expect(signClient.connect()).resolves.toBe(signClient);
        expect(signClient.isOpen()).toBe(true);
    });

    test('should not connect', async () => {
        const signClient = new SignClient('/dev/serial2', undefined, MockBinding);
        await expect(signClient.connect()).rejects.toThrowError();
        expect(signClient.isOpen()).toBe(false); 
    });

    test('should not send', async () => {
        const signClient = new SignClient('/dev/serial2', undefined, MockBinding);
        await expect(signClient.connect()).rejects.toThrowError();
        expect(signClient.isOpen()).toBe(false); 
        await expect(signClient.send(new TestTransmissionPacket())).rejects.toThrowError();
    });

    test('should not send due to serial error', async () => {
        const signClient = new SignClient('/dev/serial2', undefined, MockBinding);
        await expect(signClient.connect()).rejects.toThrowError();
        await expect(signClient.send(new TestTransmissionPacket())).rejects.toThrowError();
    });

    test('should send', async () => {
        const signClient = await new SignClient('/dev/serial1', undefined, MockBinding).connect();
        await expect(signClient.send(new TestTransmissionPacket())).resolves.toBeUndefined();
    });

    test('should send and listen for a response', async () => {
        const signClient = await new SignClient('/dev/serial1', undefined, MockBinding).connect();
        const port = new SerialPortStream({ binding: MockBinding, path: '/dev/serial1', baudRate: 9600 });
        port.once('data', () => {
            port.port?.emitData(Buffer.from(samplePacket));
        })
        const response = await signClient.send(new ReadTextFileCommand(FileLabels.get('A')));
        expect(response).toBeDefined();
    });
});
