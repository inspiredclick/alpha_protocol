import { TransmissionPacket } from "../../../TransmissionPacket";
import { CommandCode, Chars, RunSequenceOrder, KeyboardProtectionStatus } from "../../../types";
import { RunSequenceConfig } from "./RunSequenceConfig";

export class ReadRunSequenceResponse extends TransmissionPacket {
  commandCode: CommandCode = CommandCode.READ_SPECIAL_FUNCTION;

  private packetPosition: number;
  private sequence: RunSequenceConfig[] = [];

  constructor(data: number[], packetPosition: number) {
    super();

    this.data = data;
    this.packetPosition = packetPosition;
    
    let char:number = Chars.NULL;
    while (true) {
      char = data[++this.packetPosition];
      if (char === Chars.END_OF_TEXT) { break; }

      const runSequenceConfig = new RunSequenceConfig();
      // Run Sequence Order
      if (char === RunSequenceOrder.TIMES) {
        runSequenceConfig.runSequenceOrder = RunSequenceOrder.TIMES;
      }
      else if (char === RunSequenceOrder.IN_ORDER) {
        runSequenceConfig.runSequenceOrder = RunSequenceOrder.IN_ORDER;
      }
      else if (char === RunSequenceOrder.RUN_THEN_DELETE) {
        runSequenceConfig.runSequenceOrder = RunSequenceOrder.RUN_THEN_DELETE;
      }
      else {
        throw new Error("Invalid run sequence order");
      }

      // Keyboard Protection Status
      char = data[++this.packetPosition];
      if (char === KeyboardProtectionStatus.DISABLED) {
        runSequenceConfig.keyboardProtectionStatus = KeyboardProtectionStatus.DISABLED;
      }
      else if (char === KeyboardProtectionStatus.ENABLED) {
        runSequenceConfig.keyboardProtectionStatus = KeyboardProtectionStatus.ENABLED;
      }
      else {
        throw new Error("Invalid keyboard protection status");
      }

      // File Label
      runSequenceConfig.fileLabel = String.fromCharCode(data[++this.packetPosition]);
      this.sequence.push(runSequenceConfig);
    }
  }

  toString () {
    return this.sequence.map((config, index) => {
      return `Run Sequence Config ${index + 1}:\n` +
        `Run Sequence Order: ${RunSequenceOrder[config.runSequenceOrder]}\n` +
        `Keyboard Protection Status: ${KeyboardProtectionStatus[config.keyboardProtectionStatus]}\n` +
        `File Label: ${config.fileLabel}\n`;
    }).join("\n");
  }
}