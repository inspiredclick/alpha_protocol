import './string'
import { Chars, CommandCode, TypeCode } from './types';

export abstract class TransmissionPacket {
    typeCode: TypeCode = TypeCode.ALL;
    signAddress: string = "00" 
    abstract commandCode: CommandCode;
    protected data: number[] = [];

    toByteArray(): number[] {
        let packet: number[] = [Chars.NULL, Chars.NULL, Chars.NULL, Chars.NULL, Chars.NULL, Chars.START_OF_HEADER, this.typeCode];
        packet = packet.concat(this.signAddress.toByteArray());
        packet.push(Chars.START_OF_TEXT);
        packet.push(this.commandCode);
        packet = packet.concat(this.data);
        packet.push(Chars.END_OF_TRANSMISSION);
        return packet;
    }

    toBuffer(): Buffer {
        return Buffer.from(this.toByteArray());
    }
}
