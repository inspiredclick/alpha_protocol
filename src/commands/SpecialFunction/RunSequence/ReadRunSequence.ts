import { ReadSpecialFunctionCommand, SpecialFunctionLabel } from "../SpecialFunctionCommand";

export class ReadRunSequence extends ReadSpecialFunctionCommand {
  specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.RUN_SEQUENCE;

  toByteArray(): number[] {
    this.data.push(this.specialFunctionLabel);
    return super.toByteArray();
  }
}
