import {afterAll, describe, expect, jest, test} from '@jest/globals';
import { SignClient } from './SignClient';
import { SerialPort } from 'serialport';
import { TransmissionPacket } from './TransmissionPacket';
import { CommandCode } from './types';

jest.mock('serialport');

class TestTransmissionPacket extends TransmissionPacket {
    commandCode: CommandCode = CommandCode.WRITE_TEXT_FILE;
}

describe('SignClient', () => {
    afterAll(() => {
        SerialPort.mockClear();
        jest.restoreAllMocks();
    });

    test('should connect', async () => {
        SerialPort.mockImplementation((opts, cb) => cb(null));
        const signClient = new SignClient("path");
        await expect(signClient.connect()).resolves.toBe(signClient);
    });

    test('should not connect', async () => {
        const errorMessage = "error";
        SerialPort.mockImplementation((opts, cb) => cb(errorMessage));
        const signClient = new SignClient("path");
        await expect(signClient.connect()).rejects.toBe(errorMessage);
    });

    test('should not send', async () => {
        const signClient = new SignClient("path");
        await expect(signClient.send(new TestTransmissionPacket())).rejects.toBe("Serial port not initialized");
    });

    test('should send', async () => {
        SerialPort.mockImplementation((opts, cb) => cb(null));
        jest.spyOn(SerialPort.prototype, 'write').mockImplementation((data, cb) => cb(undefined));
        const signClient = await new SignClient("path").connect();
        await expect(signClient.send(new TestTransmissionPacket())).resolves.toBeUndefined();
    });

    test('should send due to serial error', async () => {
        const errorMessage = "error";
        SerialPort.mockImplementation((opts, cb) => cb(null));
        jest.spyOn(SerialPort.prototype, 'write').mockImplementation((data, cb) => cb(errorMessage));
        const signClient = await new SignClient("path").connect();
        await expect(signClient.send(new TestTransmissionPacket())).rejects.toBe(errorMessage);
    });
});
