import { CommandCode } from "../types";
import { SpecialFunctionLabel, WriteSpecialFunctionCommand } from "./WriteSpecialFunctionCommand";

export enum MemoryLabel {
    A = 0x41
}

export enum MemoryType {
    TEXT = 0x41,
    STRING = 0x42,
    DOTS = 0x43,
}

export enum KeyboardStatus {
    UNLOCKED = 0x55,
    LOCKED = 0x4C,
}

export class SetMemory extends WriteSpecialFunctionCommand {
    specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.SET_MEMORY;
    commandCode: CommandCode = CommandCode.WRITE_SPECIAL_FUNCTION;
    configurations: MemoryConfig[] = [];

    toByteArray(): number[] {
        this.data.push(this.specialFunctionLabel);
        this.configurations.forEach(config => {
            this.data = this.data.concat(config.toByteArray());
        });
        return super.toByteArray();
    }
}

export class MemoryConfig {
    label: MemoryLabel;
    type: MemoryType;
    keyboardStatus: KeyboardStatus = KeyboardStatus.UNLOCKED;
    size: string;
    lastFourBytes: string;

    constructor(config: {label?: MemoryLabel, type?: MemoryType, keyboardStatus?: KeyboardStatus, size?: string, lastFourBytes?: string}) {
        this.label = config.label || MemoryLabel.A;
        this.type = config.type || MemoryType.TEXT;
        this.keyboardStatus = config.keyboardStatus || KeyboardStatus.UNLOCKED;
        this.size = config.size || "0000";
        this.lastFourBytes = config.lastFourBytes || "0000";
    }
    
    toByteArray(): number[] {
        if (this.size.length != 4) {
            throw new Error("Size must be 4 characters long");
        }
        if (this.lastFourBytes.length != 4) {
            throw new Error("Last four bytes must be 4 characters long");
        }
        return [this.label, this.type, this.keyboardStatus, ...this.size.toByteArray(), ...this.lastFourBytes.toByteArray()];
    }
}
