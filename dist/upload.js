import {
  BeepCommand,
  FileLabels,
  MemoryConfig,
  SetMemory,
  SignClient,
  WriteTextFileCommand,
  html
} from "./chunk-TSD6TOCL.js";

// src/upload.ts
import { promises as fs } from "fs";
import * as path from "path";
(async () => {
  let config = null;
  try {
    const args = process.argv.slice(2);
    const filePath = args[0] || path.join(__dirname, "config.json");
    const data = await fs.readFile(filePath, "utf-8");
    config = JSON.parse(data);
    console.log(config);
  } catch (error) {
    console.error("Error reading the JSON file:", error);
    process.exit(1);
  }
  console.log(`Connecting to ${config["com_port"]}`);
  const client = await new SignClient(config["com_port"]).connect();
  console.log(`Connected: ${client.isOpen()}`);
  const fileList = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const files = config["files"];
  const setMemory = new SetMemory();
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    console.log(`Configuring Memory for File ${file}`);
    let fileSize = "0000";
    if (i < files.length) {
      fileSize = "0400";
    }
    setMemory.configurations.push(new MemoryConfig({
      label: file,
      size: fileSize,
      lastFourBytes: "FF00"
    }));
  }
  console.log("Sending memory configuration");
  await client.send(setMemory);
  console.log("Memory configured");
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    console.log(`Writing File ${file}`);
    if (i < files.length) {
      const writeFile = new WriteTextFileCommand(FileLabels.get(file));
      writeFile.append(html(files[i]["content"]));
      await client.send(writeFile);
      console.log("Text written");
    }
  }
  const beep = new BeepCommand();
  await client.send(beep);
  console.log("Beep sent");
})();
