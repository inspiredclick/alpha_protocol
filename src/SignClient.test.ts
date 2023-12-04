import {afterAll, describe, expect, jest, test} from '@jest/globals';
import { SignClient } from './SignClient';
import { SerialPort, SerialPortMock } from 'serialport';
import { TransmissionPacket } from './TransmissionPacket';
import { CommandCode, FileLabels } from './types';
import { SerialPortStream } from '@serialport/stream';
import { ReadTextFileResponse } from './commands/TextFile/ReadTextFileResponse';
import { ReadTextFileCommand } from './commands/ReadTextFileCommand';
import { MockBinding } from '@serialport/binding-mock';

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

const unrecognizedPacket = [
    0,  0,  0,   0,   0,  4
];

const malformedPacket = [
    0,  0,  0,   0,   0,   1,  90,  48, 48,  2, 66, 65,
    4,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   1,  48,  48,  48,   2, 65, 65, 69, 27, 32, // 69 is not a valid mode code
  111, 28, 67, 104, 101, 108, 108, 111,  3, 48, 51, 65,
   52,  4
];

const openOptions = { path: '/dev/serial1', baudRate: 9600 };

describe('SignClient', () => {
    beforeEach(() => {
        SerialPortMock.binding.createPort('/dev/serial1', { echo: false, record: false })
    });

    afterEach(() => {
        SerialPortMock.binding.reset();
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
        setTimeout(() => {
            signClient.serial?.emit('data', Buffer.from(samplePacket));
        }, 100);
        const response = await signClient.send(new ReadTextFileCommand(FileLabels.get('A')));
        expect(response).toBeDefined();
    });

    test('should send and listen for an unrecognized response', async () => {
        const signClient = await new SignClient('/dev/serial1', undefined, MockBinding).connect();
        setTimeout(() => {
            signClient.serial?.emit('data', Buffer.from(unrecognizedPacket));
        }, 100);
        await expect(signClient.send(new TestTransmissionPacket(true))).toBeDefined();
    });

    test('should send and listen for a malformed packet', async () => {
        const signClient = await new SignClient('/dev/serial1', undefined, MockBinding).connect();
        setTimeout(() => {
            signClient.serial?.emit('data', Buffer.from(malformedPacket));
        }, 100);
        await expect(signClient.send(new TestTransmissionPacket(true))).rejects.toThrowError();
    });

    test('should send and listen for a multi bufferresponse', async () => {
        const signClient = await new SignClient('/dev/serial1', undefined, MockBinding).connect();
        setTimeout(() => {
            signClient.serial?.emit('data', Buffer.from(samplePacket.slice(0, 10)));
        }, 100);
        setTimeout(() => {
            signClient.serial?.emit('data', Buffer.from(samplePacket.slice(10)));
        }, 110);
        const response = await signClient.send(new ReadTextFileCommand(FileLabels.get('A')));
        expect(response).toBeDefined();
    });
});
