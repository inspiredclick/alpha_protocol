import {describe, expect, test} from '@jest/globals';
import { WriteTextFileCommand } from './WriteTextFileCommand';
import { TransmissionPacketFactory } from '../../TransmissionPacketFactory';
import { Chars, Color, CommandCode, DisplayPosition, FileLabels, ModeCode } from '../../types';
import { text } from '../../elements';

describe('WriteTextFileCommand', () => {
    test('toBuffer', () => {
        const helloWorld = "hello world";
        const packet = new WriteTextFileCommand();
        packet.append(text(helloWorld));

        let data: number[] = [FileLabels.get(), Chars.COLOR_FIELD, Color.AUTO];
        data = data.concat(helloWorld.toByteArray());
        const packetBuffer = TransmissionPacketFactory.createPacketBytes(
            Buffer.from([CommandCode.WRITE_TEXT_FILE]),
            Buffer.from(data)
        );

        expect(packet.toBuffer()).toEqual(packetBuffer);
    });
});


