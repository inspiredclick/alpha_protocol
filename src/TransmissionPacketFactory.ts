import { Chars, TypeCode } from "./types";

export class TransmissionPacketFactory {
    static readonly DEFAULT_ADDRESS = "00";

    static createPacketBytes(commandCode: Buffer, data: Buffer): Buffer {
        let packet = Buffer.from([Chars.NULL, Chars.NULL, Chars.NULL, Chars.NULL, Chars.NULL, 
            Chars.START_OF_HEADER, TypeCode.ALL, ...this.DEFAULT_ADDRESS.toByteArray(), Chars.START_OF_TEXT]);
        packet = Buffer.concat([packet, commandCode, data]);
        packet = Buffer.concat([packet, Buffer.from([Chars.END_OF_TRANSMISSION])]);
        return packet;
    }
}
