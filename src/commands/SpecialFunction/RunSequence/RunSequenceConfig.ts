import { KeyboardProtectionStatus, RunSequenceOrder } from "../../../types";

export class RunSequenceConfig {
  runSequenceOrder: RunSequenceOrder = RunSequenceOrder.IN_ORDER;
  keyboardProtectionStatus: KeyboardProtectionStatus = KeyboardProtectionStatus.DISABLED;
  fileLabel: string = "A";
}
