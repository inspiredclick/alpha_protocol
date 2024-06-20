import { ReadSpecialFunctionCommand, SpecialFunctionLabel } from "../SpecialFunctionCommand";
import { RunSequenceConfig } from "./RunSequenceConfig";

export class SetRunSequence extends ReadSpecialFunctionCommand {
  specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.RUN_SEQUENCE;
  sequence: RunSequenceConfig[] = [];

  toByteArray(): number[] {
    if (this.sequence.length === 0) {
      console.warn("Run sequence is empty");
    }
    this.data.push(this.specialFunctionLabel);
    return super.toByteArray();
  }

}
