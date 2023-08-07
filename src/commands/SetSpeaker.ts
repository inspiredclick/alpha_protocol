import { SpecialFunctionLabel, WriteSpecialFunctionCommand } from "./WriteSpecialFunctionCommand";

export class SetSpeaker extends WriteSpecialFunctionCommand {
    static readonly ENABLE = 0x30;
    static readonly DISABLE = 0x46;
    specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.SET_SPEAKER;
    speaker: boolean;

    constructor(speaker: boolean) {
        super();
        this.speaker = speaker;
    }

    toByteArray(): number[] {
        this.data.push(this.specialFunctionLabel);
        this.data.push(this.speaker ? SetSpeaker.ENABLE : SetSpeaker.DISABLE);
        return super.toByteArray();
    }
}
