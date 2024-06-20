import { FileLabel, FileLabels, KeyboardProtectionStatus, RunSequenceOrder } from "../../../types";

export class RunSequenceConfig {
  runSequenceOrder: RunSequenceOrder;
  keyboardProtectionStatus: KeyboardProtectionStatus;
  fileLabel: FileLabel;

  constructor(fileLabel?: FileLabel, runSequenceOrder?: RunSequenceOrder, keyboardProtectionStatus?: KeyboardProtectionStatus) {
    this.fileLabel = fileLabel ? fileLabel : FileLabels.get("A");
    this.runSequenceOrder = runSequenceOrder || RunSequenceOrder.IN_ORDER;
    this.keyboardProtectionStatus = keyboardProtectionStatus || KeyboardProtectionStatus.DISABLED;
  }
}
