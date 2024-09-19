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
  TagParser: () => TagParser,
  TransmissionPacket: () => TransmissionPacket,
  TransmissionPacketFactory: () => TransmissionPacketFactory
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

// src/SignClient.ts
var import_serialport = require("serialport");
var import_stream = require("@serialport/stream");

// src/TagParser.ts
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

// src/elements.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TagParser,
  TransmissionPacket,
  TransmissionPacketFactory
});
