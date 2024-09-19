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

export { TagParser, TransmissionPacket, TransmissionPacketFactory };
