import { ReadSpecialFunctionCommand, SpecialFunctionLabel } from "../SpecialFunctionCommand";
import { RunSequenceConfig } from "./RunSequenceConfig";

export class SetRunSequence extends ReadSpecialFunctionCommand {
  specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.RUN_SEQUENCE;
  sequence: RunSequenceConfig[] = [];

  toByteArray(): number[] {
    this.data.push(this.specialFunctionLabel);
    return super.toByteArray();
  }

}
