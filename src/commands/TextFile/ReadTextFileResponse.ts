import { TransmissionPacket } from "../../TransmissionPacket";
import { Chars, CommandCode, DisplayPosition, FileLabel, ModeCode } from "../../types";

export class ReadTextFileResponse extends TransmissionPacket {
    commandCode: CommandCode = CommandCode.READ_TEXT_FILE;

    private packetPosition: number;
    private fileLabel: FileLabel;
    private displayPosition: DisplayPosition;
    private modeCode: ModeCode;
    private specialIdentifier?: number;
    private processedText: string = "";
    
    constructor(data: number[], packetPosition: number) {
        super();
        this.data = data;
        this.packetPosition = packetPosition;
        this.fileLabel = data[++this.packetPosition] as FileLabel;
        if (this.data[++this.packetPosition] !== Chars.MODE_FIELD) {
            throw new Error("Invalid packet");
        }
        this.displayPosition = data[++this.packetPosition] as DisplayPosition;
        this.modeCode = data[++this.packetPosition] as ModeCode;
        this.specialIdentifier = data[++this.packetPosition];
        ++this.packetPosition;
        let char = Chars.NULL;
        while (true) {
            char = data[++this.packetPosition];
            if (char === Chars.END_OF_TEXT) { break; }
            this.processedText += String.fromCharCode(char);
        }
    }

    get text() {
        return this.processedText
    }
}