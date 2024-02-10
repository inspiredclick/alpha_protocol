import { text } from "../../elements";
import { Chars } from "../../types";
import { ReadSpecialFunctionCommand, SpecialFunctionLabel } from "./SpecialFunctionCommand";

export class ReadRunSequence extends ReadSpecialFunctionCommand {
  specialFunctionLabel: SpecialFunctionLabel = SpecialFunctionLabel.READ_RUN_SEQUENCE;

  toByteArray(): number[] {
    this.data.push(this.specialFunctionLabel);
    this.data.concat(text("TUABCDEFGHIJKL"));
    return super.toByteArray();
  }
}
