import { describe, expect, test } from '@jest/globals';
import { text } from './elements';
import { Chars, Color, DisplayPosition, ModeCode } from './types';

describe('elements', () => {
    describe('text', () => {
        test('should return a number array', () => {
            const output = text('hello');
            expect(output).toStrictEqual([Chars.MODE_FIELD, DisplayPosition.MIDDLE_LINE, ModeCode.AUTO, Color.RED, 104, 101, 108, 108, 111]);
        });
    });

    // describe('icon', () => {
    //     test('should return a number array', () => {
    //         let output = icon(SpecialGraphics.NO_SMOKING);
    //         expect(output).toStrictEqual([Chars.MODE_FIELD, DisplayPosition.MIDDLE_LINE, ModeCode.SPECIAL, Color.RED, SpecialGraphics.NO_SMOKING]);
    //     });
    // });
});
