"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BeepCommand: () => BeepCommand,
  Chars: () => Chars,
  Color: () => Color,
  Command: () => Command,
  CommandCode: () => CommandCode,
  Day: () => Day,
  DisplayPosition: () => DisplayPosition,
  FileLabels: () => FileLabels,
  GenericResponse: () => GenericResponse,
  KeyboardStatus: () => KeyboardStatus,
  MemoryConfig: () => MemoryConfig,
  MemoryType: () => MemoryType,
  ModeCode: () => ModeCode,
  ReadTextFileCommand: () => ReadTextFileCommand,
  ReadTextFileResponse: () => ReadTextFileResponse,
  Response: () => Response,
  ResponseFactory: () => ResponseFactory,
  ResponseFactoryError: () => ResponseFactoryError,
  ResponseFactoryErrorCode: () => ResponseFactoryErrorCode,
  SetDay: () => SetDay,
  SetMemory: () => SetMemory,
  SetSpeaker: () => SetSpeaker,
  SetTime: () => SetTime,
  SignClient: () => SignClient,
  SpeakerTone: () => SpeakerTone,
  SpecialFunctionLabel: () => SpecialFunctionLabel,
  SpecialGraphics: () => SpecialGraphics,
  TagParser: () => TagParser,
  TransmissionPacket: () => TransmissionPacket,
  TransmissionPacketFactory: () => TransmissionPacketFactory,
  TypeCode: () => TypeCode,
  WriteSpecialFunctionCommand: () => WriteSpecialFunctionCommand,
  WriteTextFileCommand: () => WriteTextFileCommand,
  html: () => html,
  text: () => text
});
module.exports = __toCommonJS(src_exports);

// src/string.ts
String.prototype.toByteArray = function() {
  const byteBuffer = [];
  const buffer = Buffer.from(this, "utf8");
  for (let i = 0; i < buffer.length; i++) {
    byteBuffer.push(buffer[i]);
  }
  return byteBuffer;
};

// src/types.ts
var FileLabels = class {
  static LABELS = [
    {
      text: "A",
      address: 65
    },
    {
      text: "B",
      address: 66
    },
    {
      text: "C",
      address: 67
    },
    {
      text: "D",
      address: 68
    },
    {
      text: "E",
      address: 69
    },
    {
      text: "F",
      address: 70
    },
    {
      text: "G",
      address: 71
    },
    {
      text: "H",
      address: 72
    }
  ];
  static get(label = "A") {
    const result = this.LABELS.find((x) => x.text === label)?.address;
    if (result === void 0) {
      throw new Error("File label not found");
    }
    return result;
  }
  static keys() {
    return this.LABELS.map((x) => x.text);
  }
};
var DisplayPosition = /* @__PURE__ */ ((DisplayPosition3) => {
  DisplayPosition3[DisplayPosition3["MIDDLE_LINE"] = 32] = "MIDDLE_LINE";
  DisplayPosition3[DisplayPosition3["TOP_LINE"] = 34] = "TOP_LINE";
  DisplayPosition3[DisplayPosition3["BOTTOM_LINE"] = 38] = "BOTTOM_LINE";
  DisplayPosition3[DisplayPosition3["FILL"] = 48] = "FILL";
  DisplayPosition3[DisplayPosition3["LEFT"] = 49] = "LEFT";
  DisplayPosition3[DisplayPosition3["RIGHT"] = 50] = "RIGHT";
  return DisplayPosition3;
})(DisplayPosition || {});
var ModeCode = /* @__PURE__ */ ((ModeCode3) => {
  ModeCode3[ModeCode3["SCROLL"] = 97] = "SCROLL";
  ModeCode3[ModeCode3["HOLD"] = 98] = "HOLD";
  ModeCode3[ModeCode3["FLASH"] = 99] = "FLASH";
  ModeCode3[ModeCode3["RESERVED"] = 100] = "RESERVED";
  ModeCode3[ModeCode3["ROLL_UP"] = 101] = "ROLL_UP";
  ModeCode3[ModeCode3["ROLL_DOWN"] = 102] = "ROLL_DOWN";
  ModeCode3[ModeCode3["ROLL_LEFT"] = 103] = "ROLL_LEFT";
  ModeCode3[ModeCode3["ROLL_RIGHT"] = 104] = "ROLL_RIGHT";
  ModeCode3[ModeCode3["ROLL_IN"] = 112] = "ROLL_IN";
  ModeCode3[ModeCode3["ROLL_OUT"] = 113] = "ROLL_OUT";
  ModeCode3[ModeCode3["WIPE_UP"] = 105] = "WIPE_UP";
  ModeCode3[ModeCode3["WIPE_DOWN"] = 106] = "WIPE_DOWN";
  ModeCode3[ModeCode3["WIPE_LEFT"] = 107] = "WIPE_LEFT";
  ModeCode3[ModeCode3["WIPE_RIGHT"] = 108] = "WIPE_RIGHT";
  ModeCode3[ModeCode3["WIPE_IN"] = 114] = "WIPE_IN";
  ModeCode3[ModeCode3["WIPE_OUT"] = 115] = "WIPE_OUT";
  ModeCode3[ModeCode3["TWO_LINE_SCROLL"] = 109] = "TWO_LINE_SCROLL";
  ModeCode3[ModeCode3["AUTO"] = 111] = "AUTO";
  ModeCode3[ModeCode3["SPECIAL"] = 110] = "SPECIAL";
  return ModeCode3;
})(ModeCode || {});
var SpecialGraphics = /* @__PURE__ */ ((SpecialGraphics2) => {
  SpecialGraphics2[SpecialGraphics2["THANK_YOU"] = 83] = "THANK_YOU";
  SpecialGraphics2[SpecialGraphics2["NO_SMOKING"] = 85] = "NO_SMOKING";
  SpecialGraphics2[SpecialGraphics2["DONT_DRINK_DRIVE"] = 86] = "DONT_DRINK_DRIVE";
  SpecialGraphics2[SpecialGraphics2["RUNNING_ANIMAL"] = 87] = "RUNNING_ANIMAL";
  SpecialGraphics2[SpecialGraphics2["FIREWORKS"] = 88] = "FIREWORKS";
  SpecialGraphics2[SpecialGraphics2["TURBO_CAR"] = 89] = "TURBO_CAR";
  SpecialGraphics2[SpecialGraphics2["CHERRY_BOMB"] = 90] = "CHERRY_BOMB";
  return SpecialGraphics2;
})(SpecialGraphics || {});
var TypeCode = /* @__PURE__ */ ((TypeCode3) => {
  TypeCode3[TypeCode3["ALL"] = 90] = "ALL";
  TypeCode3[TypeCode3["RESPONSE"] = 48] = "RESPONSE";
  return TypeCode3;
})(TypeCode || {});
var CommandCode = /* @__PURE__ */ ((CommandCode3) => {
  CommandCode3[CommandCode3["WRITE_TEXT_FILE"] = 65] = "WRITE_TEXT_FILE";
  CommandCode3[CommandCode3["READ_TEXT_FILE"] = 66] = "READ_TEXT_FILE";
  CommandCode3[CommandCode3["WRITE_SPECIAL_FUNCTION"] = 69] = "WRITE_SPECIAL_FUNCTION";
  CommandCode3[CommandCode3["READ_SPECIAL_FUNCTION"] = 70] = "READ_SPECIAL_FUNCTION";
  CommandCode3[CommandCode3["WRITE_STRING_FILE"] = 71] = "WRITE_STRING_FILE";
  CommandCode3[CommandCode3["READ_STRING_FILE"] = 72] = "READ_STRING_FILE";
  CommandCode3[CommandCode3["WRITE_SMALL_DOTS_PICTURE"] = 73] = "WRITE_SMALL_DOTS_PICTURE";
  CommandCode3[CommandCode3["READ_SMALL_DOTS_PICTURE"] = 74] = "READ_SMALL_DOTS_PICTURE";
  CommandCode3[CommandCode3["WRITE_RGB_DOTS_PICTURE"] = 75] = "WRITE_RGB_DOTS_PICTURE";
  CommandCode3[CommandCode3["READ_RGB_DOTS_PICTURE"] = 76] = "READ_RGB_DOTS_PICTURE";
  CommandCode3[CommandCode3["WRITE_LARGE_DOTS_PICTURE"] = 77] = "WRITE_LARGE_DOTS_PICTURE";
  CommandCode3[CommandCode3["READ_LARGE_DOTS_PICTURE"] = 78] = "READ_LARGE_DOTS_PICTURE";
  CommandCode3[CommandCode3["WRITE_ALPHAVISION_BULLETIN"] = 79] = "WRITE_ALPHAVISION_BULLETIN";
  CommandCode3[CommandCode3["SET_TIMEOUT_MESSAGE"] = 84] = "SET_TIMEOUT_MESSAGE";
  return CommandCode3;
})(CommandCode || {});
var Chars = /* @__PURE__ */ ((Chars2) => {
  Chars2[Chars2["NULL"] = 0] = "NULL";
  Chars2[Chars2["START_OF_HEADER"] = 1] = "START_OF_HEADER";
  Chars2[Chars2["START_OF_TEXT"] = 2] = "START_OF_TEXT";
  Chars2[Chars2["END_OF_TRANSMISSION"] = 4] = "END_OF_TRANSMISSION";
  Chars2[Chars2["END_OF_TEXT"] = 3] = "END_OF_TEXT";
  Chars2[Chars2["ESCAPE"] = 27] = "ESCAPE";
  Chars2[Chars2["MODE_FIELD"] = 27] = "MODE_FIELD";
  Chars2[Chars2["COLOR_FIELD"] = 28] = "COLOR_FIELD";
  return Chars2;
})(Chars || {});
var Color = /* @__PURE__ */ ((Color2) => {
  Color2[Color2["BLACK"] = 48] = "BLACK";
  Color2[Color2["RED"] = 49] = "RED";
  Color2[Color2["GREEN"] = 50] = "GREEN";
  Color2[Color2["AMBER"] = 51] = "AMBER";
  Color2[Color2["DIM_RED"] = 52] = "DIM_RED";
  Color2[Color2["DIM_GREEN"] = 53] = "DIM_GREEN";
  Color2[Color2["BROWN"] = 54] = "BROWN";
  Color2[Color2["ORANGE"] = 55] = "ORANGE";
  Color2[Color2["YELLOW"] = 56] = "YELLOW";
  Color2[Color2["RAINBOW_1"] = 57] = "RAINBOW_1";
  Color2[Color2["RAINBOW_2"] = 65] = "RAINBOW_2";
  Color2[Color2["COLOR_MIX"] = 66] = "COLOR_MIX";
  Color2[Color2["AUTO"] = 67] = "AUTO";
  return Color2;
})(Color || {});

// src/TransmissionPacket.ts
var TransmissionPacket = class {
  typeCode = 90 /* ALL */;
  signAddress = "00";
  data = [];
  expectsResponse = false;
  toByteArray() {
    let packet = [0 /* NULL */, 0 /* NULL */, 0 /* NULL */, 0 /* NULL */, 0 /* NULL */, 1 /* START_OF_HEADER */, this.typeCode];
    packet = packet.concat(this.signAddress.toByteArray());
    packet.push(2 /* START_OF_TEXT */);
    packet.push(this.commandCode);
    packet = packet.concat(this.data);
    packet.push(4 /* END_OF_TRANSMISSION */);
    return packet;
  }
  toBuffer() {
    return Buffer.from(this.toByteArray());
  }
};

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

// src/commands/Command.ts
var Command = class extends TransmissionPacket {
};

// src/commands/TextFile/WriteTextFileCommand.ts
var WriteTextFileCommand = class extends Command {
  fileLabel;
  commandCode = 65 /* WRITE_TEXT_FILE */;
  constructor(fileLabel) {
    super();
    this.fileLabel = fileLabel || FileLabels.get();
    this.data = [this.fileLabel];
  }
  append(data) {
    this.data = this.data.concat(data);
  }
};

// src/SignClient.ts
var import_serialport = require("serialport");

// src/commands/Response.ts
var Response = class {
};
var GenericResponse = class extends Response {
};

// src/commands/TextFile/ReadTextFileResponse.ts
var ReadTextFileResponse = class extends TransmissionPacket {
  commandCode = 66 /* READ_TEXT_FILE */;
  packetPosition;
  fileLabel;
  displayPosition;
  modeCode;
  specialIdentifier;
  processedText = "";
  constructor(data, packetPosition) {
    super();
    this.data = data;
    this.packetPosition = packetPosition;
    this.fileLabel = data[++this.packetPosition];
    if (this.data[++this.packetPosition] !== 27 /* MODE_FIELD */) {
      throw new Error("Invalid packet");
    }
    this.displayPosition = data[++this.packetPosition];
    this.modeCode = data[++this.packetPosition];
    this.specialIdentifier = data[++this.packetPosition];
    ++this.packetPosition;
    let char = 0 /* NULL */;
    while (true) {
      char = data[++this.packetPosition];
      if (char === 3 /* END_OF_TEXT */) {
        break;
      }
      this.processedText += String.fromCharCode(char);
    }
  }
  get text() {
    return this.processedText;
  }
};

// src/commands/ResponseFactory.ts
var ResponseFactoryErrorCode = /* @__PURE__ */ ((ResponseFactoryErrorCode2) => {
  ResponseFactoryErrorCode2[ResponseFactoryErrorCode2["INVALID_PACKET"] = 0] = "INVALID_PACKET";
  ResponseFactoryErrorCode2[ResponseFactoryErrorCode2["MALFORMED_PACKET"] = 1] = "MALFORMED_PACKET";
  ResponseFactoryErrorCode2[ResponseFactoryErrorCode2["ERROR"] = 2] = "ERROR";
  return ResponseFactoryErrorCode2;
})(ResponseFactoryErrorCode || {});
var ResponseFactoryError = class extends Error {
  code;
  constructor(code, message) {
    super();
    this.code = code;
    this.name = `ResponseFactoryError.${ResponseFactoryErrorCode[code]}`;
    this.message = message || "";
  }
};
var ResponseFactory = class {
  static parse(buffer) {
    let bufArray = Array.from(buffer);
    let packetPosition = bufArray.lastIndexOf(1 /* START_OF_HEADER */);
    if (packetPosition < 0) {
      throw new ResponseFactoryError(0 /* INVALID_PACKET */, "Buffer does not have a SOH");
    }
    packetPosition = packetPosition + 4;
    if (bufArray[packetPosition] !== 2 /* START_OF_TEXT */) {
      throw new ResponseFactoryError(0 /* INVALID_PACKET */, "Buffer does not start with STX");
    }
    const commandCode = bufArray[++packetPosition];
    try {
      switch (commandCode) {
        case 65 /* WRITE_TEXT_FILE */:
          return new ReadTextFileResponse(bufArray, packetPosition);
        default:
          return new GenericResponse();
      }
    } catch (err) {
      throw new ResponseFactoryError(1 /* MALFORMED_PACKET */, "Malformed packet");
    }
  }
};

// src/SignClient.ts
var import_stream = require("@serialport/stream");
var import_stream2 = require("stream");
var SignClientResponseParser = class extends import_stream2.Transform {
  PACKET_START_BYTE_COUNT = 20;
  PACKET_START = Buffer.from(Array(this.PACKET_START_BYTE_COUNT).fill(0 /* NULL */));
  dataBuffer;
  inPacket = false;
  constructor() {
    super();
    this.dataBuffer = Buffer.from([]);
  }
  _transform(chunk, encoding, callback) {
    this.dataBuffer = Buffer.concat([this.dataBuffer, chunk]);
    if (this.dataBuffer.includes(this.PACKET_START) && !this.inPacket) {
      const startHeaderIndex = this.dataBuffer.indexOf(1 /* START_OF_HEADER */);
      this.dataBuffer = this.dataBuffer.subarray(startHeaderIndex - this.PACKET_START_BYTE_COUNT);
      this.inPacket = true;
    } else if (this.dataBuffer.includes(4 /* END_OF_TRANSMISSION */) && this.inPacket) {
      this.push(this.dataBuffer);
      this.dataBuffer = Buffer.from([]);
      this.inPacket = false;
    }
    callback();
  }
};
var SignClient = class {
  DEFAULT_BAUD_RATE = 9600;
  DEFAULT_TIMEOUT = 5e3;
  DEFAULT_DATA_PAUSE = 1e3;
  comPort;
  baudRate;
  serial;
  parser;
  binding;
  timeoutMs = this.DEFAULT_TIMEOUT;
  timeout;
  dataPauseMs = this.DEFAULT_DATA_PAUSE;
  constructor(comPort, baudRate, binding, timeout, dataPause) {
    this.comPort = comPort;
    this.baudRate = baudRate || this.DEFAULT_BAUD_RATE;
    this.binding = binding;
    this.timeoutMs = timeout || this.DEFAULT_TIMEOUT;
    this.dataPauseMs = dataPause || this.DEFAULT_DATA_PAUSE;
  }
  async connect() {
    return new Promise((resolve, reject) => {
      this.serial = new import_stream.SerialPortStream({
        binding: this.binding || import_serialport.SerialPort.binding,
        path: this.comPort,
        baudRate: this.baudRate
      }, (err) => {
        if (err !== null) {
          this.serial = void 0;
          reject(err);
          return;
        }
        this.parser = this.serial?.pipe(new SignClientResponseParser());
        resolve(this);
        return;
      });
    });
  }
  async send(packet) {
    return new Promise((resolve, reject) => {
      if (!this.serial) {
        throw new Error("Serial port is not open");
      }
      if (packet.expectsResponse) {
        const responseListener = this.parser?.on("data", async (data) => {
          responseListener?.removeAllListeners();
          clearTimeout(this.timeout);
          this.timeout = void 0;
          try {
            const response = await ResponseFactory.parse(data);
            resolve(response);
          } catch (err) {
            reject(err);
          }
        });
        const errorListener = this.parser?.on("error", (err) => {
          errorListener?.removeAllListeners();
          reject(err);
        });
      }
      const packetBufferArray = packet.toByteArray();
      const chunkSize = packetBufferArray.length / 8;
      const promises = [];
      for (let i = 0; i < packetBufferArray.length; i += chunkSize) {
        const chunk = packetBufferArray.slice(i, i + chunkSize);
        promises.push(this.sendPacket(chunk));
        promises.push(new Promise((resolve2) => {
          setTimeout(resolve2, this.dataPauseMs);
        }));
      }
      promises.push(new Promise((resolve2, reject2) => {
        if (packet.expectsResponse) {
          this.timeout = setTimeout(() => {
            reject2("Timeout");
          }, this.timeoutMs);
        } else {
          resolve2(void 0);
        }
      }));
      Promise.all(promises).then(() => {
        if (!packet.expectsResponse) {
          resolve(void 0);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
  async sendPacket(chunk) {
    return new Promise((resolve, reject) => {
      if (!this.serial) {
        throw new Error("Serial port is not open");
      }
      this.serial.write(Buffer.from(chunk), (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(void 0);
      });
    });
  }
  isOpen() {
    return this.serial?.isOpen || false;
  }
};

// src/elements.ts
var TagParser = class {
  static tagRegex = /<([a-z]+)([^>]*)>([^<]*)<\/\1>/g;
  static attributeRegex = /([a-z]+)="([^"]*)"/g;
  static supportedTags = ["message"];
  static parse(html2) {
    let data = [];
    let match;
    while ((match = this.tagRegex.exec(html2)) !== null) {
      const [, tagName, attributes, content] = match;
      if (this.supportedTags.indexOf(tagName) === -1) {
        throw new Error("Unsupported tag: " + tagName);
      }
      const tag = {
        tagName,
        attributes: {},
        content: content.trim()
      };
      let attributeMatch;
      while ((attributeMatch = this.attributeRegex.exec(attributes)) !== null) {
        const [, attributeName, attributeValue] = attributeMatch;
        switch (attributeName.toLocaleLowerCase()) {
          case "position":
            tag.attributes.displayPosition = this.parseDisplayPostition(attributeValue);
            break;
          case "mode":
            tag.attributes.mode = this.parseMode(attributeValue);
            break;
          case "color":
            tag.attributes.color = this.parseColor(attributeValue);
            break;
          default:
            break;
        }
      }
      data = data.concat(text(tag.content, {
        displayPosition: tag.attributes.displayPosition,
        modeCode: tag.attributes.mode,
        color: tag.attributes.color
      }));
    }
    return data;
  }
  static parseDisplayPostition(displayPosition) {
    switch (displayPosition.toLocaleLowerCase()) {
      case "middle_line":
        return 32 /* MIDDLE_LINE */;
      case "top_line":
        return 34 /* TOP_LINE */;
      case "bottom_line":
        return 38 /* BOTTOM_LINE */;
      case "fill":
        return 48 /* FILL */;
      case "left":
        return 49 /* LEFT */;
      case "right":
        return 50 /* RIGHT */;
      default:
        return void 0;
    }
  }
  static parseMode(mode) {
    switch (mode.toLocaleLowerCase()) {
      case "scroll":
        return 97 /* SCROLL */;
      case "hold":
        return 98 /* HOLD */;
      case "flash":
        return 99 /* FLASH */;
      case "reserved":
        return 100 /* RESERVED */;
      case "roll_up":
        return 101 /* ROLL_UP */;
      case "roll_down":
        return 102 /* ROLL_DOWN */;
      case "roll_left":
        return 103 /* ROLL_LEFT */;
      case "roll_right":
        return 104 /* ROLL_RIGHT */;
      case "roll_in":
        return 112 /* ROLL_IN */;
      case "roll_out":
        return 113 /* ROLL_OUT */;
      case "wipe_up":
        return 105 /* WIPE_UP */;
      case "wipe_down":
        return 106 /* WIPE_DOWN */;
      case "wipe_left":
        return 107 /* WIPE_LEFT */;
      case "wipe_right":
        return 108 /* WIPE_RIGHT */;
      case "wipe_in":
        return 114 /* WIPE_IN */;
      case "wipe_out":
        return 115 /* WIPE_OUT */;
      case "two_line_scroll":
        return 109 /* TWO_LINE_SCROLL */;
      case "auto":
        return 111 /* AUTO */;
      case "special":
        return 110 /* SPECIAL */;
      default:
        return void 0;
    }
  }
  static parseColor(color) {
    switch (color.toLocaleLowerCase()) {
      case "auto":
        return 67 /* AUTO */;
      case "red":
        return 49 /* RED */;
      case "green":
        return 50 /* GREEN */;
      case "amber":
        return 51 /* AMBER */;
      case "dim_red":
        return 52 /* DIM_RED */;
      case "dim_green":
        return 53 /* DIM_GREEN */;
      case "brown":
        return 54 /* BROWN */;
      case "orange":
        return 55 /* ORANGE */;
      case "yellow":
        return 56 /* YELLOW */;
      case "rainbow_1":
        return 57 /* RAINBOW_1 */;
      case "rainbow_2":
        return 65 /* RAINBOW_2 */;
      case "color_mix":
        return 66 /* COLOR_MIX */;
      default:
        return void 0;
    }
  }
};
function text(text2, config) {
  let output = [];
  if (config?.displayPosition !== void 0 || config?.modeCode !== void 0) {
    output.push(27 /* MODE_FIELD */);
    output.push(config?.displayPosition || 32 /* MIDDLE_LINE */);
    output.push(config?.modeCode || 111 /* AUTO */);
  }
  const color = config?.color || 67 /* AUTO */;
  output.push(28 /* COLOR_FIELD */);
  output.push(color);
  output = output.concat(text2.toByteArray());
  return output;
}
function html(text2) {
  return TagParser.parse(text2);
}

// src/icli.ts
var import_terminal_kit = require("terminal-kit");
var import_serialport2 = require("serialport");

// src/commands/WriteSpecialFunctionCommand.ts
var SpecialFunctionLabel = /* @__PURE__ */ ((SpecialFunctionLabel2) => {
  SpecialFunctionLabel2[SpecialFunctionLabel2["SET_TIME"] = 32] = "SET_TIME";
  SpecialFunctionLabel2[SpecialFunctionLabel2["SET_SPEAKER"] = 33] = "SET_SPEAKER";
  SpecialFunctionLabel2[SpecialFunctionLabel2["SET_MEMORY"] = 36] = "SET_MEMORY";
  SpecialFunctionLabel2[SpecialFunctionLabel2["SET_DAY"] = 38] = "SET_DAY";
  return SpecialFunctionLabel2;
})(SpecialFunctionLabel || {});
var WriteSpecialFunctionCommand = class extends Command {
  commandCode = 69 /* WRITE_SPECIAL_FUNCTION */;
};

// src/commands/SetMemory.ts
var MemoryType = /* @__PURE__ */ ((MemoryType2) => {
  MemoryType2[MemoryType2["TEXT"] = 65] = "TEXT";
  MemoryType2[MemoryType2["STRING"] = 66] = "STRING";
  MemoryType2[MemoryType2["DOTS"] = 67] = "DOTS";
  return MemoryType2;
})(MemoryType || {});
var KeyboardStatus = /* @__PURE__ */ ((KeyboardStatus2) => {
  KeyboardStatus2[KeyboardStatus2["UNLOCKED"] = 85] = "UNLOCKED";
  KeyboardStatus2[KeyboardStatus2["LOCKED"] = 76] = "LOCKED";
  return KeyboardStatus2;
})(KeyboardStatus || {});
var SetMemory = class extends WriteSpecialFunctionCommand {
  specialFunctionLabel = 36 /* SET_MEMORY */;
  commandCode = 69 /* WRITE_SPECIAL_FUNCTION */;
  configurations = [];
  toByteArray() {
    this.data.push(this.specialFunctionLabel);
    this.configurations.forEach((config) => {
      this.data = this.data.concat(config.toByteArray());
    });
    return super.toByteArray();
  }
};
var MemoryConfig = class {
  label;
  type;
  keyboardStatus = 85 /* UNLOCKED */;
  size;
  lastFourBytes;
  constructor(config) {
    this.label = config.label || "A";
    this.type = config.type || 65 /* TEXT */;
    this.keyboardStatus = config.keyboardStatus || 85 /* UNLOCKED */;
    this.size = config.size || "0000";
    this.lastFourBytes = config.lastFourBytes || "0000";
  }
  toByteArray() {
    if (this.size.length != 4) {
      throw new Error("Size must be 4 characters long");
    }
    if (this.lastFourBytes.length != 4) {
      throw new Error("Last four bytes must be 4 characters long");
    }
    return [FileLabels.get(this.label), this.type, this.keyboardStatus, ...this.size.toByteArray(), ...this.lastFourBytes.toByteArray()];
  }
};

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
  import_terminal_kit.terminal.on("key", (key) => {
    if (key === "CTRL_C") {
      import_terminal_kit.terminal.clear();
      import_terminal_kit.terminal.grabInput(false);
      process.exit();
    }
  });
  const portPaths = (await import_serialport2.SerialPort.list()).map((port) => port.path);
  (0, import_terminal_kit.terminal)("Choose COM Port:\n");
  const comPortReponse = await import_terminal_kit.terminal.singleColumnMenu(portPaths).promise;
  const comPort = portPaths[comPortReponse.selectedIndex];
  const client = await new SignClient(comPort).connect();
  import_terminal_kit.terminal.green("Sign Connected.\n");
  const setMemory = new SetMemory();
  setMemory.configurations.push(new MemoryConfig({
    size: "0400",
    lastFourBytes: "FF00"
  }));
  await client.send(setMemory);
  import_terminal_kit.terminal.green("Memory Configured\n\n");
  import_terminal_kit.terminal.bold("AlphaProtocol Interactive CLI\n");
  (0, import_terminal_kit.terminal)("(CTRL+C to Exit)\n\n\n");
  while (true) {
    (0, import_terminal_kit.terminal)("Open file:\n");
    const files = FileLabels.keys();
    const file = await import_terminal_kit.terminal.gridMenu(files).promise;
    const fileAddress = FileLabels.get(file.selectedText);
    const readTextFile = new ReadTextFileCommand(fileAddress);
    let readTextFileResponse;
    try {
      readTextFileResponse = await client.send(readTextFile);
    } catch (err) {
      import_terminal_kit.terminal.red(`${err}

`);
      continue;
    }
    (0, import_terminal_kit.terminal)(`File ${file.selectedText} input:`);
    const signText = await import_terminal_kit.terminal.inputField({
      cancelable: true,
      default: readTextFileResponse.text
    }).promise;
    if (signText === void 0) {
      import_terminal_kit.terminal.red("Canceled");
      continue;
    }
    const writeText = new WriteTextFileCommand(fileAddress);
    writeText.append(text(signText));
    await client.send(writeText);
    import_terminal_kit.terminal.green(`
File ${file.selectedText} written.

`);
  }
})();

// src/commands/Beep.ts
var SpeakerTone = /* @__PURE__ */ ((SpeakerTone2) => {
  SpeakerTone2[SpeakerTone2["ON"] = 65] = "ON";
  SpeakerTone2[SpeakerTone2["OFF"] = 66] = "OFF";
  SpeakerTone2[SpeakerTone2["TONE"] = 48] = "TONE";
  SpeakerTone2[SpeakerTone2["THREE_TONES"] = 49] = "THREE_TONES";
  return SpeakerTone2;
})(SpeakerTone || {});
var BeepCommand = class extends TransmissionPacket {
  BEEP_COMMAND = 40;
  commandCode = 69 /* WRITE_SPECIAL_FUNCTION */;
  speakerTone = 48 /* TONE */;
  data = [this.BEEP_COMMAND];
  toByteArray() {
    this.data.push(this.speakerTone);
    return super.toByteArray();
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  text
});
