import {describe, expect, test} from '@jest/globals';
import { WriteTextFileCommand } from './WriteTextFileCommand';
import { TransmissionPacketFactory } from '../TransmissionPacketFactory';
import { Chars, Color, CommandCode, DisplayPosition, FileLabels, ModeCode, TypeCode } from '../types';
import { text } from '../elements';
import { ResponseFactory, ResponseFactoryError, ResponseFactoryErrorCode } from './ResponseFactory';
import { GenericResponse, ReadTextFileResponse } from './Response';

/*
ON DATA
<Buffer 00 00 00 00 00 00 00 00 00>
ON DATA
<Buffer 00 00 00 00 00 00 00 00 00 00>
ON DATA
<Buffer 00 00 00 00 00 00 00 01 30 30>
ON DATA
<Buffer 30 02>
ON DATA
<Buffer 41 41>
ON DATA
<Buffer 1b 20 6f 1c 43 03 30>
ON DATA
<Buffer 31 39 30 04>

[
   0, 0, 0,  0,  0,  1, 0,  0,  0,  0,
   0, 0, 0,  0,  0,  0, 0,  0,  0,  0,
   0, 0, 0,  0,  0,  0, 0,  0,  0,  0,
   0, 0, 1, 48, 48, 48, 2, 65, 65, 27,
  32
]
[
    0,  0,  0,   0,   0,   1,  90,  48, 48,  2, 66, 65,
    4,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   1,  48,  48,  48,   2, 65, 65, 27, 32,
  111, 28, 67, 104, 101, 108, 108, 111,  3, 48, 51, 65,
   52,  4
]//hello
*/

const samplePacket = [
    0,  0,  0,   0,   0,   1,  90,  48, 48,  2, 66, 65,
    4,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   0,   0,   0,   0,   0,  0,  0,  0,  0,
    0,  0,  0,   1,  48,  48,  48,   2, 65, 65, 27, 32,
  111, 28, 67, 104, 101, 108, 108, 111,  3, 48, 51, 65,
   52,  4
];

describe('Response', () => {
    describe('ResponseFactory', () => {
        test('should throw an error if the packet is invalid', () => {
            try {
                ResponseFactory.parse(Buffer.from([Chars.NULL]));
            }
            catch (e) {
                expect(e).toBeInstanceOf(ResponseFactoryError);
                expect(e.code).toBe(ResponseFactoryErrorCode.INVALID_PACKET);
            }
        });

        test('should return a valid packet', () => {
            const packet = Buffer.from(samplePacket);
            const response = ResponseFactory.parse(packet);

            expect(response).toBeInstanceOf(ReadTextFileResponse);
        });
    });
});


