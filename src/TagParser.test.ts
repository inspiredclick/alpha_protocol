import {TagParser} from './TagParser';
import { Color, DisplayPosition, ModeCode } from './types';

describe('TagParser', () => {
    test('should parse basic message to bytes', () => {
        let output = TagParser.parse('<message>hello world</message>');
        expect(output).toEqual([
            27,  32, 111,  28,  67,
           104, 101, 108, 108, 111,
            32, 119, 111, 114, 108,
           100
        ]);
    });

    test('should parse basic message with an unknown attr', () => {
        let output = TagParser.parse('<message weird="ok">hello world</message>');
        expect(output).toEqual([
            27,  32, 111,  28,  67,
           104, 101, 108, 108, 111,
            32, 119, 111, 114, 108,
           100
        ]);
    });

    test('should parse basic message with a position', () => {
        let output = TagParser.parse('<message position="middle_line">hello world</message>');
        let position = output[1];
        expect(position).toEqual(DisplayPosition.MIDDLE_LINE);

        output = TagParser.parse('<message position="top_line">hello world</message>');
        position = output[1];
        expect(position).toEqual(DisplayPosition.TOP_LINE);

        output = TagParser.parse('<message position="bottom_line">hello world</message>');
        position = output[1];
        expect(position).toEqual(DisplayPosition.BOTTOM_LINE);

        output = TagParser.parse('<message position="fill">hello world</message>');
        position = output[1];
        expect(position).toEqual(DisplayPosition.FILL);

        output = TagParser.parse('<message position="left">hello world</message>');
        position = output[1];
        expect(position).toEqual(DisplayPosition.LEFT);

        output = TagParser.parse('<message position="right">hello world</message>');
        position = output[1];
        expect(position).toEqual(DisplayPosition.RIGHT);

        output = TagParser.parse('<message position="blarg">hello world</message>');
        position = output[1];
        expect(position).toEqual(DisplayPosition.MIDDLE_LINE);
    });

    test('should parse basic message with a mode', () => {
        let output = TagParser.parse('<message mode="scroll">hello world</message>');
        let mode = output[2];
        expect(mode).toEqual(ModeCode.SCROLL);

        output = TagParser.parse('<message mode="hold">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.HOLD);

        output = TagParser.parse('<message mode="flash">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.FLASH);

        output = TagParser.parse('<message mode="reserved">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.RESERVED);

        output = TagParser.parse('<message mode="roll_up">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.ROLL_UP);

        output = TagParser.parse('<message mode="roll_down">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.ROLL_DOWN);

        output = TagParser.parse('<message mode="roll_left">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.ROLL_LEFT);

        output = TagParser.parse('<message mode="roll_right">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.ROLL_RIGHT);

        output = TagParser.parse('<message mode="roll_in">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.ROLL_IN);

        output = TagParser.parse('<message mode="roll_out">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.ROLL_OUT);

        output = TagParser.parse('<message mode="wipe_up">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.WIPE_UP);

        output = TagParser.parse('<message mode="wipe_down">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.WIPE_DOWN);

        output = TagParser.parse('<message mode="wipe_left">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.WIPE_LEFT);

        output = TagParser.parse('<message mode="wipe_right">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.WIPE_RIGHT);

        output = TagParser.parse('<message mode="wipe_in">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.WIPE_IN);

        output = TagParser.parse('<message mode="wipe_out">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.WIPE_OUT);

        output = TagParser.parse('<message mode="two_line_scroll">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.TWO_LINE_SCROLL);

        output = TagParser.parse('<message mode="auto">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.AUTO);

        output = TagParser.parse('<message mode="special">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.SPECIAL);

        output = TagParser.parse('<message mode="null">hello world</message>');
        mode = output[2];
        expect(mode).toEqual(ModeCode.AUTO);
    });

    test('should parse basic message with a color', () => {
        let output = TagParser.parse('<message color="auto">hello world</message>');
        let color = output[4];
        expect(color).toEqual(Color.AUTO);

        output = TagParser.parse('<message color="unknown">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.AUTO);

        output = TagParser.parse('<message color="red">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.RED);

        output = TagParser.parse('<message color="green">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.GREEN);

        output = TagParser.parse('<message color="amber">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.AMBER);

        output = TagParser.parse('<message color="dim_red">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.DIM_RED);

        output = TagParser.parse('<message color="dim_green">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.DIM_GREEN);

        output = TagParser.parse('<message color="brown">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.BROWN);

        output = TagParser.parse('<message color="orange">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.ORANGE);

        output = TagParser.parse('<message color="yellow">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.YELLOW);

        output = TagParser.parse('<message color="rainbow_1">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.RAINBOW_1);

        output = TagParser.parse('<message color="rainbow_2">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.RAINBOW_2);

        output = TagParser.parse('<message color="color_mix">hello world</message>');
        color = output[4];
        expect(color).toEqual(Color.COLOR_MIX);
    });

    test('should throw error on unsupported tag', () => {
        expect(() => TagParser.parse('<blah>hello world</blah>')).toThrow();
    });

});
