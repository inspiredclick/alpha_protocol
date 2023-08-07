import { TransmissionPacket } from "../TransmissionPacket";
import { CommandCode } from "../types";

export enum SpeakerTone {
    ON = 0x41,
    OFF = 0x42,
    TONE = 0x30,
    THREE_TONES = 0x31,
    // PROGRAMMABLE_TONE = 0x32,
}

export class BeepCommand extends TransmissionPacket {
    readonly BEEP_COMMAND = 0x28;
    commandCode = CommandCode.WRITE_SPECIAL_FUNCTION;

    speakerTone: SpeakerTone = SpeakerTone.TONE;
    data = [this.BEEP_COMMAND];

    toByteArray(): number[] {
        this.data.push(this.speakerTone);
        return super.toByteArray();
    }
}
