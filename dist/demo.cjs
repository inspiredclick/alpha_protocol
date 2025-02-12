"use strict";

// src/demo.ts
var import_serialport2 = require("serialport");

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

// src/string.ts
String.prototype.toByteArray = function() {
  const byteBuffer = [];
  const buffer = Buffer.from(this, "utf8");
  for (let i = 0; i < buffer.length; i++) {
    byteBuffer.push(buffer[i]);
  }
  return byteBuffer;
};

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

// src/commands/Command.ts
var Command = class extends TransmissionPacket {
};

// src/commands/WriteSpecialFunctionCommand.ts
var WriteSpecialFunctionCommand = class extends Command {
  commandCode = 69 /* WRITE_SPECIAL_FUNCTION */;
};

// src/commands/SetMemory.ts
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
  constructor(comPort2, baudRate, binding, timeout, dataPause) {
    this.comPort = comPort2;
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

// src/commands/Beep.ts
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

// src/demo.ts
var comPort = process.argv[2];
(async () => {
  const ports = await import_serialport2.SerialPort.list();
  console.log("Available ports:");
  ports.forEach((port) => {
    console.log(`- ${port.path}`);
  });
  console.log();
  const client = await new SignClient(comPort).connect();
  console.log(`Connected: ${client.isOpen()}`);
  const setMemory = new SetMemory();
  setMemory.configurations.push(new MemoryConfig({
    size: "0400",
    lastFourBytes: "FF00"
  }));
  setMemory.configurations.push(new MemoryConfig({
    label: "B",
    size: "0400",
    lastFourBytes: "FF00"
  }));
  await client.send(setMemory);
  console.log("Memory configured");
  const writeFileA = new WriteTextFileCommand();
  writeFileA.append(text("Hello World               ", {
    displayPosition: 34 /* TOP_LINE */,
    modeCode: 98 /* HOLD */,
    color: 57 /* RAINBOW_1 */
  }));
  writeFileA.append(html('<message position="bottom_line" mode="scroll" color="red">This is a</message>'));
  writeFileA.append(html('<message color="rainbow_1">demo</message>'));
  writeFileA.append(html('<message color="red">of the Alpha 2.0 Protocol on an Alpha 4140C device</message>'));
  await client.send(writeFileA);
  console.log("Text written");
  const writeFileB = new WriteTextFileCommand(FileLabels.get("B"));
  writeFileB.append(html('<message position="middle_line">File B</message>'));
  await client.send(writeFileB);
  console.log("Text written");
  const beep = new BeepCommand();
  await client.send(beep);
  console.log("Beep sent");
  process.exit();
})();
