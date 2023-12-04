import { CommandCode, FileLabel, FileLabels } from "../types";
import { Command } from "./Command";

export class ReadTextFileCommand extends Command {
    private fileLabel: FileLabel;
    commandCode: CommandCode = CommandCode.READ_TEXT_FILE;
    expectsResponse: boolean = true;

    constructor(fileLabel: FileLabel) {
        super();
        this.fileLabel = fileLabel;
        this.data = [this.fileLabel];
    }
    
}
