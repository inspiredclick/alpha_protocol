import { SerialPort } from "serialport";
import { SetMemory, MemoryConfig } from "./commands/SpecialFunction/SetMemory";
import { WriteTextFileCommand } from "./commands/TextFile/WriteTextFileCommand";
import { SignClient } from "./SignClient";
import { html, text } from "./elements";
import { Color, DisplayPosition, FileLabels, ModeCode } from "./types";
import { BeepCommand } from "./commands/Beep";
import { ReadTextFileCommand } from "./commands/TextFile/ReadTextFileCommand";
import { ReadTextFileResponse } from "./commands/TextFile/ReadTextFileResponse";
import { ReadRunSequence } from "./commands/SpecialFunction/ReadRunSequence";
import { Response } from "./commands/Response";
import { TransmissionPacket } from "./TransmissionPacket";

const comPort = process.argv[2];

(async () => {
  const ports = await SerialPort.list();
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
  try {
    await client.send(setMemory);
  } catch (err) {
    console.error(err);
  }
  console.log("Memory configured");

  const readRunSequence = new ReadRunSequence();
  let readRunSequenceResponse: TransmissionPacket;
  try {
    readRunSequenceResponse = await client.send(readRunSequence);
    console.log(readRunSequenceResponse.toByteArray());
  } catch (err) {
    console.error(err);
  }

  // const writeFileA = new WriteTextFileCommand();
  // writeFileA.append(text("Hello World               ", {
  //   displayPosition: DisplayPosition.TOP_LINE,
  //   modeCode: ModeCode.HOLD,
  //   color: Color.RAINBOW_1,
  // }));
  // writeFileA.append(html('<message position="bottom_line" mode="scroll" color="red">This is a</message>'));
  // writeFileA.append(html('<message color="rainbow_1">demo</message>'));
  // writeFileA.append(html('<message color="red">of the Alpha 2.0 Protocol on an Alpha 4140C device</message>'));
  // await client.send(writeFileA);
  // console.log("Text written");
  
  // const writeFileB = new WriteTextFileCommand(FileLabels.get("B"));
  // writeFileB.append(html("<message position=\"middle_line\">File B</message>"));
  // await client.send(writeFileB);
  // console.log("Text written");

  const beep = new BeepCommand();
  try {
    await client.send(beep);
  } catch (err) {
    console.error(err);
  }
  console.log("Beep sent");

  process.exit();
})();

