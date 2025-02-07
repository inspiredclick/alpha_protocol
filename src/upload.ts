import { promises as fs } from 'fs';
import * as path from 'path';
import { SignClient } from './SignClient';
import { SetMemory, MemoryConfig } from './commands/SetMemory';
import { FileLabels } from './types';
import { WriteTextFileCommand } from './commands/TextFile/WriteTextFileCommand';
import { BeepCommand } from './commands/Beep';
import { html } from './elements';

(async () => {
  let config = null;
  try {
    // Get the file path from command line arguments
    const args = process.argv.slice(2);
    const filePath = args[0] || path.join(__dirname, 'config.json');

    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf-8');

    // Parse the JSON data
    config = JSON.parse(data);

    // Use the config data
    console.log(config);
  } catch (error) {
    console.error('Error reading the JSON file:', error);
    process.exit(1);
  }

  console.log(`Connecting to ${config['com_port']}`);
  const client = await new SignClient(config['com_port']).connect();
  console.log(`Connected: ${client.isOpen()}`);

  const fileList = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const files = config['files'];
  for (let i=0; i<fileList.length; i++) {
    const file = fileList[i];
    if (i < files.length) {
      console.log(`Uploading File ${file}`);
      
      const setMemory = new SetMemory();
      setMemory.configurations.push(new MemoryConfig({
          label: file,
          size: "0000",
          lastFourBytes: "FF00"
        }));
      await client.send(setMemory);
      console.log("Memory configured");

      const fileData = files[i]['content'];

      const writeFile = new WriteTextFileCommand(FileLabels.get(file));
      writeFile.append(html(fileData));
      await client.send(writeFile);
      console.log("Text written");
    }
    else {
      console.log(`File ${file} not uploaded`);
      const setMemory = new SetMemory();
      setMemory.configurations.push(new MemoryConfig({
          label: file,
          size: "0000",
          lastFourBytes: "FF00"
        }));
      await client.send(setMemory);
      console.log("Memory configured");
    }

    const beep = new BeepCommand();
    await client.send(beep);
    console.log("Beep sent");
  }
})();