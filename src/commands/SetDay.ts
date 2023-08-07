import { SpecialFunctionLabel, WriteSpecialFunctionCommand } from "./WriteSpecialFunctionCommand";

export enum Day {
    SUNDAY = 0x31,
    MONDAY = 0x32,
    TUESDAY = 0x33,
    WEDNESDAY = 0x34,
    THURSDAY = 0x35,
    FRIDAY = 0x36,
    SATURDAY = 0x37
}

export class SetDay extends WriteSpecialFunctionCommand {
    specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.SET_DAY;
    day: Day;

    constructor(day: Day) {
        super();
        this.day = day;
    }

    toByteArray(): number[] {
        this.data = [this.specialFunctionLabel, this.day];
        return super.toByteArray();
    }
}
