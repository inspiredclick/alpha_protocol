import { SerialPortStream } from '@serialport/stream';
import { BindingInterface } from '@serialport/bindings-interface';
import { Transform, TransformCallback } from 'stream';

declare abstract class Command extends TransmissionPacket {
}

declare enum SpecialFunctionLabel {
    SET_TIME = 32,
    SET_SPEAKER = 33,
    SET_MEMORY = 36,
    SET_DAY = 38
}
declare abstract class WriteSpecialFunctionCommand extends Command {
    commandCode: CommandCode;
    abstract specialFunctionLabel: SpecialFunctionLabel;
}

declare enum MemoryLabel {
    A = 65
}
declare enum MemoryType {
    TEXT = 65,
    STRING = 66,
    DOTS = 67
}
declare enum KeyboardStatus {
    UNLOCKED = 85,
    LOCKED = 76
}
declare class SetMemory extends WriteSpecialFunctionCommand {
    specialFunctionLabel: SpecialFunctionLabel;
    commandCode: CommandCode;
    configurations: MemoryConfig[];
    toByteArray(): number[];
}
declare class MemoryConfig {
    label: MemoryLabel;
    type: MemoryType;
    keyboardStatus: KeyboardStatus;
    size: string;
    lastFourBytes: string;
    constructor(config: {
        label?: MemoryLabel;
        type?: MemoryType;
        keyboardStatus?: KeyboardStatus;
        size?: string;
        lastFourBytes?: string;
    });
    toByteArray(): number[];
}

declare class WriteTextFileCommand extends Command {
    private fileLabel;
    commandCode: CommandCode;
    constructor(fileLabel?: FileLabel);
    append(data: number[]): void;
}

declare enum SpeakerTone {
    ON = 65,
    OFF = 66,
    TONE = 48,
    THREE_TONES = 49
}
declare class BeepCommand extends TransmissionPacket {
    readonly BEEP_COMMAND = 40;
    commandCode: CommandCode;
    speakerTone: SpeakerTone;
    data: number[];
    toByteArray(): number[];
}

declare class SignClientResponseParser extends Transform {
    private readonly PACKET_START_BYTE_COUNT;
    private readonly PACKET_START;
    private dataBuffer;
    private inPacket;
    constructor();
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
}
declare class SignClient {
    private readonly DEFAULT_BAUD_RATE;
    private readonly DEFAULT_TIMEOUT;
    private readonly DEFAULT_DATA_PAUSE;
    comPort: string;
    baudRate: number;
    serial?: SerialPortStream;
    parser?: SignClientResponseParser;
    private binding?;
    private timeoutMs;
    private timeout?;
    private dataPauseMs;
    constructor(comPort: string, baudRate?: number, binding?: BindingInterface, timeout?: number, dataPause?: number);
    connect(): Promise<SignClient>;
    send<T extends TransmissionPacket>(packet: TransmissionPacket): Promise<T>;
    private sendPacket;
    isOpen(): boolean;
}

declare function text(text: string, config?: {
    displayPosition?: DisplayPosition;
    modeCode?: ModeCode;
    color?: Color;
}): number[];
declare function html(text: string): number[];

type FileLabel = number;
declare class FileLabels {
    private static LABELS;
    static get(label?: string): FileLabel;
    static keys(): string[];
}
declare const enum DisplayPosition {
    MIDDLE_LINE = 32,
    TOP_LINE = 34,
    BOTTOM_LINE = 38,
    FILL = 48,
    LEFT = 49,
    RIGHT = 50
}
declare const enum ModeCode {
    SCROLL = 97,
    HOLD = 98,
    FLASH = 99,
    RESERVED = 100,
    ROLL_UP = 101,
    ROLL_DOWN = 102,
    ROLL_LEFT = 103,
    ROLL_RIGHT = 104,
    ROLL_IN = 112,
    ROLL_OUT = 113,
    WIPE_UP = 105,
    WIPE_DOWN = 106,
    WIPE_LEFT = 107,
    WIPE_RIGHT = 108,
    WIPE_IN = 114,
    WIPE_OUT = 115,
    TWO_LINE_SCROLL = 109,
    AUTO = 111,
    SPECIAL = 110
}
declare const enum SpecialGraphics {
    THANK_YOU = 83,
    NO_SMOKING = 85,
    DONT_DRINK_DRIVE = 86,
    RUNNING_ANIMAL = 87,
    FIREWORKS = 88,
    TURBO_CAR = 89,
    CHERRY_BOMB = 90
}
declare const enum TypeCode {
    ALL = 90,
    RESPONSE = 48
}
declare const enum CommandCode {
    WRITE_TEXT_FILE = 65,
    READ_TEXT_FILE = 66,
    WRITE_SPECIAL_FUNCTION = 69,
    READ_SPECIAL_FUNCTION = 70,
    WRITE_STRING_FILE = 71,
    READ_STRING_FILE = 72,
    WRITE_SMALL_DOTS_PICTURE = 73,
    READ_SMALL_DOTS_PICTURE = 74,
    WRITE_RGB_DOTS_PICTURE = 75,
    READ_RGB_DOTS_PICTURE = 76,
    WRITE_LARGE_DOTS_PICTURE = 77,
    READ_LARGE_DOTS_PICTURE = 78,
    WRITE_ALPHAVISION_BULLETIN = 79,
    SET_TIMEOUT_MESSAGE = 84
}
declare const enum Chars {
    NULL = 0,
    START_OF_HEADER = 1,
    START_OF_TEXT = 2,
    END_OF_TRANSMISSION = 4,
    END_OF_TEXT = 3,
    ESCAPE = 27,
    MODE_FIELD = 27,
    COLOR_FIELD = 28
}
declare const enum Color {
    BLACK = 48,
    RED = 49,
    GREEN = 50,
    AMBER = 51,
    DIM_RED = 52,
    DIM_GREEN = 53,
    BROWN = 54,
    ORANGE = 55,
    YELLOW = 56,
    RAINBOW_1 = 57,
    RAINBOW_2 = 65,
    COLOR_MIX = 66,
    AUTO = 67
}

declare abstract class TransmissionPacket {
    typeCode: TypeCode;
    signAddress: string;
    abstract commandCode: CommandCode;
    protected data: number[];
    expectsResponse: boolean;
    toByteArray(): number[];
    toBuffer(): Buffer;
}

declare class TransmissionPacketFactory {
    static readonly DEFAULT_ADDRESS = "00";
    static createPacketBytes(commandCode: Buffer, data: Buffer): Buffer;
}

declare class TagParser {
    private static readonly tagRegex;
    private static readonly attributeRegex;
    private static readonly supportedTags;
    static parse(html: string): number[];
    private static parseDisplayPostition;
    private static parseMode;
    private static parseColor;
}

export { BeepCommand, Chars, Color, CommandCode, DisplayPosition, type FileLabel, FileLabels, ModeCode, SetMemory, SignClient, SpeakerTone, SpecialGraphics, TagParser, TransmissionPacket, TransmissionPacketFactory, TypeCode, WriteTextFileCommand, html, text };
