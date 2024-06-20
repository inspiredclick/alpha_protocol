import { SerialPort } from "serialport";
import { SetMemory, MemoryConfig } from "./commands/SpecialFunction/SetMemory";
import { WriteTextFileCommand } from "./commands/TextFile/WriteTextFileCommand";
import { SignClient } from "./SignClient";
import { html, text } from "./elements";
import { Color, DisplayPosition, FileLabels, ModeCode } from "./types";
import { BeepCommand } from "./commands/Beep";
import { ReadRunSequence } from "./commands/SpecialFunction/RunSequence/ReadRunSequence";
import { ReadRunSequenceResponse } from "./commands/SpecialFunction/RunSequence/ReadRunSequenceResponse";

const comPort = process.argv[2];

(async () => {
  try {
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

    const writeFileA = new WriteTextFileCommand();
    writeFileA.append(text("Hello World1               ", {
      displayPosition: DisplayPosition.TOP_LINE,
      modeCode: ModeCode.HOLD,
      color: Color.RAINBOW_1,
    }));
    writeFileA.append(html('<message position="bottom_line" mode="scroll" color="red">This is a</message>'));
    writeFileA.append(html('<message color="rainbow_1">demo</message>'));
    writeFileA.append(html('<message color="red">of the Alpha 2.0 Protocol on an Alpha 4140C device</message>'));
    await client.send(writeFileA);
    console.log("Text written");
    
    const writeFileB = new WriteTextFileCommand(FileLabels.get("B"));
    writeFileB.append(html("<message position=\"middle_line\">File B</message>"));
    await client.send(writeFileB);
    console.log("Text written");

    const readRunSeq = new ReadRunSequence();
    const response = await client.send<ReadRunSequenceResponse>(readRunSeq);
    console.log(response.toString());
    console.log("Run sequence read");

    const beep = new BeepCommand();
    await client.send(beep);
    console.log("Beep sent");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

