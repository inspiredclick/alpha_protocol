import {describe, expect, test} from '@jest/globals';
import { BeepCommand, SpeakerTone } from './Beep';
import { TransmissionPacketFactory } from '../TransmissionPacketFactory';
import { CommandCode } from '../types';

describe('BeepCommand', () => {
    test('toBuffer', () => {
        const packet = new BeepCommand();
        const packetBuffer = TransmissionPacketFactory.createPacketBytes(Buffer.from([CommandCode.WRITE_SPECIAL_FUNCTION]), Buffer.from([packet.BEEP_COMMAND, SpeakerTone.TONE]));
        expect(packet.toBuffer()).toEqual(packetBuffer);
    });
});
