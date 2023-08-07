import { SerialPort } from "serialport";
import { SetMemory, MemoryConfig } from "./commands/SetMemory";
import { WriteTextFileCommand } from "./commands/WriteTextFileCommand";
import { SignClient } from "./SignClient";
import { text } from "./elements";
import { Color, DisplayPosition, ModeCode } from "./types";
import { BeepCommand } from "./commands/Beep";

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

  const writeText = new WriteTextFileCommand();
  writeText.append(text("Hello World"));
  writeText.append(text("Bottom Text", {
    displayPosition: DisplayPosition.BOTTOM_LINE,
    modeCode: ModeCode.HOLD,
    color: Color.RED,
  }));
  await client.send(writeText);
  console.log("Text written");

  const beep = new BeepCommand();
  await client.send(beep);
  console.log("Beep sent");
})();

