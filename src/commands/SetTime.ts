import { SpecialFunctionLabel, WriteSpecialFunctionCommand } from "./WriteSpecialFunctionCommand";

export class SetTime extends WriteSpecialFunctionCommand {
    specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.SET_TIME;
    hour: number;
    minute: number;

    constructor(hour: number, minute: number) {
        super();
        if (hour < 0 || hour > 23) throw new Error("hour must be between 0 and 23");
        if (minute < 0 || minute > 59) throw new Error("minute must be between 0 and 59");
        this.hour = hour;
        this.minute = minute;
    }

    private pad(num: number): string {
        return ("0" + num).slice(-2);
    }

    toByteArray(): number[] {
        this.data.push(this.specialFunctionLabel);
        this.data = this.data.concat(this.pad(this.hour).toByteArray());
        this.data = this.data.concat(this.pad(this.minute).toByteArray());
        return super.toByteArray();
    }

}