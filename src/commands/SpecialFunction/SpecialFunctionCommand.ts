import { CommandCode } from "../../types";
import { Command } from "../Command";

export enum SpecialFunctionLabel {
    SET_TIME = 0x20,
    SET_SPEAKER = 0x21,
    SET_MEMORY = 0x24,
    SET_DAY = 0x26,
    RUN_SEQUENCE = 0x2E,
}

export abstract class WriteSpecialFunctionCommand extends Command {
    commandCode: CommandCode = CommandCode.WRITE_SPECIAL_FUNCTION;
    abstract specialFunctionLabel: SpecialFunctionLabel;
}

export abstract class ReadSpecialFunctionCommand extends Command {
    commandCode: CommandCode = CommandCode.READ_SPECIAL_FUNCTION;
    abstract specialFunctionLabel: SpecialFunctionLabel;
    expectsResponse: boolean = true;
}
