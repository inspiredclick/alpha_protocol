/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export type FileLabel = number;
export class FileLabels {
    private static LABELS: { text: string; address: number }[] = [
        {
            text: "A",
            address: 0x41
        },
        {
            text: "B",
            address: 0x42
        }
    ];

    static get(label: string = "A"): FileLabel {
        const result = this.LABELS.find(x => x.text === label)?.address;
        if (result === undefined) {
            throw new Error("File label not found");
        }
        return result;
    }

    static keys(): string[] {
        return this.LABELS.map(x => x.text);
    }
}

export enum DisplayPosition {
    MIDDLE_LINE = 0x20, // Space
    TOP_LINE = 0x22, // "
    BOTTOM_LINE = 0x26, // &
    FILL = 0x30, // 0
    LEFT = 0x31, // 1
    RIGHT = 0x32, // 2
}

export enum ModeCode {
    SCROLL = 0x61,
    HOLD = 0x62,
    FLASH = 0x63,
    RESERVED = 0x64,
    ROLL_UP = 0x65,
    ROLL_DOWN = 0x66,
    ROLL_LEFT = 0x67,
    ROLL_RIGHT = 0x68,
    ROLL_IN = 0x70,
    ROLL_OUT = 0x71,
    WIPE_UP = 0x69,
    WIPE_DOWN = 0x6A,
    WIPE_LEFT = 0x6B,
    WIPE_RIGHT = 0x6C,
    WIPE_IN = 0x72,
    WIPE_OUT = 0x73,
    TWO_LINE_SCROLL = 0x6D,
    AUTO = 0x6F,
    SPECIAL = 0x6E,
}

export enum SpecialGraphics {
    THANK_YOU = 0x53,
    NO_SMOKING = 0x55,
    DONT_DRINK_DRIVE = 0x56,
    RUNNING_ANIMAL = 0x57,
    FIREWORKS = 0x58,
    TURBO_CAR = 0x59,
    CHERRY_BOMB = 0x5A,
}

export enum TypeCode {
    ALL = 0x5a,
    RESPONSE = 0x30,
}

export enum CommandCode {
    WRITE_TEXT_FILE = 0x41,
    READ_TEXT_FILE = 0x42,
    WRITE_SPECIAL_FUNCTION = 0x45,
    READ_SPECIAL_FUNCTION = 0x46,
    WRITE_STRING_FILE = 0x47,
    READ_STRING_FILE = 0x48,
    WRITE_SMALL_DOTS_PICTURE = 0x49,
    READ_SMALL_DOTS_PICTURE = 0x4A,
    WRITE_RGB_DOTS_PICTURE = 0x4B,
    READ_RGB_DOTS_PICTURE = 0x4C,
    WRITE_LARGE_DOTS_PICTURE = 0x4D,
    READ_LARGE_DOTS_PICTURE = 0x4E,
    WRITE_ALPHAVISION_BULLETIN = 0x4F,
    SET_TIMEOUT_MESSAGE = 0x54,
}

export enum Chars {
    NULL = 0x00,
    START_OF_HEADER = 0x01,
    START_OF_TEXT = 0x02,
    END_OF_TRANSMISSION = 0x04,
    END_OF_TEXT = 0x03,
    ESCAPE = 0x1B,
    MODE_FIELD = 0x1B,
    COLOR_FIELD = 0x1C,
}

export enum Color {
    BLACK = 0x30,
    RED = 0x31,
    GREEN = 0x32,
    AMBER = 0x33,
    DIM_RED = 0x34,
    DIM_GREEN = 0x35,
    BROWN = 0x36,
    ORANGE = 0x37,
    YELLOW = 0x38,
    RAINBOW_1 = 0x39,
    RAINBOW_2 = 0x41,
    COLOR_MIX = 0x42,
    AUTO = 0x43,
}
/* eslint-enable @typescript-eslint/no-duplicate-enum-values */
