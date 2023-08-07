import {describe, expect, test} from '@jest/globals';
import { TransmissionPacket } from './TransmissionPacket';
import { TransmissionPacketFactory } from './TransmissionPacketFactory';
import { CommandCode } from './types';

class TestTransmissionPacket extends TransmissionPacket {
  commandCode: CommandCode = CommandCode.WRITE_TEXT_FILE;
  data: number[] = "Hello World".toByteArray();
}

describe('TransmissionPacket', () => {
    test('toBuffer', () => {
        const packet = new TestTransmissionPacket();

        const packetBuffer = TransmissionPacketFactory.createPacketBytes(
          Buffer.from([CommandCode.WRITE_TEXT_FILE]),
          Buffer.from(packet.data)
        );
        expect(packet.toBuffer()).toEqual(packetBuffer);
    });
});

