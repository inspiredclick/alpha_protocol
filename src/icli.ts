import {
    terminal as term,
} from "terminal-kit";
import { FileLabel, FileLabels } from "./types";
import { SerialPort } from "serialport";
import { SignClient } from "./SignClient";
import { MemoryConfig, SetMemory } from "./commands/SetMemory";
import { WriteTextFileCommand } from "./commands/WriteTextFileCommand";
import { text } from "./elements";

(async () => {
    term.on('key', (key: string) => {
        if (key === 'CTRL_C') {
            term.clear();
            term.grabInput(false);
            process.exit();
        }
    });

    const portPaths = (await SerialPort.list()).map(port => port.path);
    term('Choose COM Port:\n')
    const comPortReponse = await term.singleColumnMenu(portPaths).promise;
    const comPort = portPaths[comPortReponse.selectedIndex];

    const client = await new SignClient(comPort).connect();
    term.green('Sign Connected.\n');
    const setMemory = new SetMemory();
    setMemory.configurations.push(new MemoryConfig({
        size: "0400",
        lastFourBytes: "FF00"
    }));
    await client.send(setMemory);
    term.green('Memory Configured\n\n');

    term.bold('AlphaProtocol Interactive CLI\n');
    term('(CTRL+C to Exit)\n\n\n');
    while(true) {
        term('Open file:\n')
        
        const files = FileLabels.keys();
        const file = await term.gridMenu(files).promise;
        const fileAddress = FileLabels.get(file.selectedText);

        term(`File ${file.selectedText} input:`)
        const signText = await term.inputField({
            cancelable: true,
            default: ""
        }).promise;

        if (signText === undefined) {
            term.red('Canceled');
            continue;
        }

        const writeText = new WriteTextFileCommand(fileAddress);
        writeText.append(text(signText));
        await client.send(writeText);
        term.green(`\nFile ${file.selectedText} written.\n\n`);
    }
})();
