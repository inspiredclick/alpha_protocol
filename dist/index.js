import {
  BeepCommand,
  Chars,
  Color,
  Command,
  CommandCode,
  DisplayPosition,
  FileLabels,
  GenericResponse,
  KeyboardStatus,
  MemoryConfig,
  MemoryType,
  ModeCode,
  ReadTextFileResponse,
  Response,
  ResponseFactory,
  ResponseFactoryError,
  ResponseFactoryErrorCode,
  SetMemory,
  SignClient,
  SpeakerTone,
  SpecialFunctionLabel,
  SpecialGraphics,
  TagParser,
  TransmissionPacket,
  TypeCode,
  WriteSpecialFunctionCommand,
  WriteTextFileCommand,
  html,
  icon,
  text
} from "./chunk-IS5DVKHA.js";

// src/TransmissionPacketFactory.ts
var TransmissionPacketFactory = class {
  static DEFAULT_ADDRESS = "00";
  static createPacketBytes(commandCode, data) {
    let packet = Buffer.from([
      0 /* NULL */,
      0 /* NULL */,
      0 /* NULL */,
      0 /* NULL */,
      0 /* NULL */,
      1 /* START_OF_HEADER */,
      90 /* ALL */,
      ...this.DEFAULT_ADDRESS.toByteArray(),
      2 /* START_OF_TEXT */
    ]);
    packet = Buffer.concat([packet, commandCode, data]);
    packet = Buffer.concat([packet, Buffer.from([4 /* END_OF_TRANSMISSION */])]);
    return packet;
  }
};

// src/icli.ts
import {
  terminal as term
} from "terminal-kit";
import { SerialPort } from "serialport";

// src/commands/TextFile/ReadTextFileCommand.ts
var ReadTextFileCommand = class extends Command {
  fileLabel;
  commandCode = 66 /* READ_TEXT_FILE */;
  expectsResponse = true;
  constructor(fileLabel) {
    super();
    this.fileLabel = fileLabel;
    this.data = [this.fileLabel];
  }
};

// src/icli.ts
(async () => {
  term.on("key", (key) => {
    if (key === "CTRL_C") {
      term.clear();
      term.grabInput(false);
      process.exit();
    }
  });
  const portPaths = (await SerialPort.list()).map((port) => port.path);
  term("Choose COM Port:\n");
  const comPortReponse = await term.singleColumnMenu(portPaths).promise;
  const comPort = portPaths[comPortReponse.selectedIndex];
  const client = await new SignClient(comPort).connect();
  term.green("Sign Connected.\n");
  const setMemory = new SetMemory();
  setMemory.configurations.push(new MemoryConfig({
    size: "0400",
    lastFourBytes: "FF00"
  }));
  await client.send(setMemory);
  term.green("Memory Configured\n\n");
  term.bold("AlphaProtocol Interactive CLI\n");
  term("(CTRL+C to Exit)\n\n\n");
  while (true) {
    term("Open file:\n");
    const files = FileLabels.keys();
    const file = await term.gridMenu(files).promise;
    const fileAddress = FileLabels.get(file.selectedText);
    const readTextFile = new ReadTextFileCommand(fileAddress);
    let readTextFileResponse;
    try {
      readTextFileResponse = await client.send(readTextFile);
    } catch (err) {
      term.red(`${err}

`);
      continue;
    }
    term(`File ${file.selectedText} input:`);
    const signText = await term.inputField({
      cancelable: true,
      default: readTextFileResponse.text
    }).promise;
    if (signText === void 0) {
      term.red("Canceled");
      continue;
    }
    const writeText = new WriteTextFileCommand(fileAddress);
    writeText.append(text(signText));
    await client.send(writeText);
    term.green(`
File ${file.selectedText} written.

`);
  }
})();

// src/commands/SetDay.ts
var Day = /* @__PURE__ */ ((Day2) => {
  Day2[Day2["SUNDAY"] = 49] = "SUNDAY";
  Day2[Day2["MONDAY"] = 50] = "MONDAY";
  Day2[Day2["TUESDAY"] = 51] = "TUESDAY";
  Day2[Day2["WEDNESDAY"] = 52] = "WEDNESDAY";
  Day2[Day2["THURSDAY"] = 53] = "THURSDAY";
  Day2[Day2["FRIDAY"] = 54] = "FRIDAY";
  Day2[Day2["SATURDAY"] = 55] = "SATURDAY";
  return Day2;
})(Day || {});
var SetDay = class extends WriteSpecialFunctionCommand {
  specialFunctionLabel = 38 /* SET_DAY */;
  day;
  constructor(day) {
    super();
    this.day = day;
  }
  toByteArray() {
    this.data = [this.specialFunctionLabel, this.day];
    return super.toByteArray();
  }
};

// src/commands/SetSpeaker.ts
var SetSpeaker = class _SetSpeaker extends WriteSpecialFunctionCommand {
  static ENABLE = 48;
  static DISABLE = 70;
  specialFunctionLabel = 33 /* SET_SPEAKER */;
  speaker;
  constructor(speaker) {
    super();
    this.speaker = speaker;
  }
  toByteArray() {
    this.data.push(this.specialFunctionLabel);
    this.data.push(this.speaker ? _SetSpeaker.ENABLE : _SetSpeaker.DISABLE);
    return super.toByteArray();
  }
};

// src/commands/SetTime.ts
var SetTime = class extends WriteSpecialFunctionCommand {
  specialFunctionLabel = 32 /* SET_TIME */;
  hour;
  minute;
  constructor(hour, minute) {
    super();
    if (hour < 0 || hour > 23) throw new Error("hour must be between 0 and 23");
    if (minute < 0 || minute > 59) throw new Error("minute must be between 0 and 59");
    this.hour = hour;
    this.minute = minute;
  }
  pad(num) {
    return ("0" + num).slice(-2);
  }
  toByteArray() {
    this.data.push(this.specialFunctionLabel);
    this.data = this.data.concat(this.pad(this.hour).toByteArray());
    this.data = this.data.concat(this.pad(this.minute).toByteArray());
    return super.toByteArray();
  }
};
export {
  BeepCommand,
  Chars,
  Color,
  Command,
  CommandCode,
  Day,
  DisplayPosition,
  FileLabels,
  GenericResponse,
  KeyboardStatus,
  MemoryConfig,
  MemoryType,
  ModeCode,
  ReadTextFileCommand,
  ReadTextFileResponse,
  Response,
  ResponseFactory,
  ResponseFactoryError,
  ResponseFactoryErrorCode,
  SetDay,
  SetMemory,
  SetSpeaker,
  SetTime,
  SignClient,
  SpeakerTone,
  SpecialFunctionLabel,
  SpecialGraphics,
  TagParser,
  TransmissionPacket,
  TransmissionPacketFactory,
  TypeCode,
  WriteSpecialFunctionCommand,
  WriteTextFileCommand,
  html,
  icon,
  text
};
