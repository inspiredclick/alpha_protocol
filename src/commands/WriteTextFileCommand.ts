import { CommandCode, FileLabel, FileLabels } from "../types";
import { Command } from "./Command";

export class WriteTextFileCommand extends Command {
    private fileLabel: FileLabel;
    commandCode: CommandCode = CommandCode.WRITE_TEXT_FILE;

    constructor(fileLabel?: FileLabel) {
        super();
        this.fileLabel = fileLabel || FileLabels.get();
        this.data = [this.fileLabel];
    }

    append(data: number[]) {
        this.data = this.data.concat(data);
    }
    
}
