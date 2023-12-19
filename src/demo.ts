import { SerialPort } from "serialport";
import { SetMemory, MemoryConfig } from "./commands/SetMemory";
import { WriteTextFileCommand } from "./commands/TextFile/WriteTextFileCommand";
import { SignClient } from "./SignClient";
import { html, text } from "./elements";
import { Color, DisplayPosition, FileLabels, ModeCode } from "./types";
import { BeepCommand } from "./commands/Beep";
import { ReadTextFileCommand } from "./commands/ReadTextFileCommand";
import { ReadTextFileResponse } from "./commands/TextFile/ReadTextFileResponse";

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
  await client.send(setMemory);
  console.log("Memory configured");

  const readText = new ReadTextFileCommand(FileLabels.get());
  const readTextResponse = await client.send<ReadTextFileResponse>(readText);

  const writeFileA = new WriteTextFileCommand();
  writeFileA.append(text("Hello World               ", {
    displayPosition: DisplayPosition.TOP_LINE,
    modeCode: ModeCode.SCROLL,
    color: Color.RAINBOW_1,
  }));
  writeFileA.append(text("This is a demo of the Alpha 2.0 Protocol on an Alpha 4041C device", {
    displayPosition: DisplayPosition.BOTTOM_LINE,
    modeCode: ModeCode.SCROLL,
    color: Color.RED,
  }));
  await client.send(writeFileA);
  console.log("Text written");
  
  const writeFileB = new WriteTextFileCommand(FileLabels.get("B"));
  writeFileB.append(html("<message position=\"middle_line\">File B</message>"));
  await client.send(writeFileB);
  console.log("Text written");

  const beep = new BeepCommand();
  await client.send(beep);
  console.log("Beep sent");

  process.exit();
})();

