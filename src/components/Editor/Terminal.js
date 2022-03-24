import {Terminal} from "xterm";
import {platform} from '@tauri-apps/api/os'
import {useEffect, useRef, useState} from "react";
import 'xterm/css/xterm.css'
import {Command} from "@tauri-apps/api/shell";
import { FitAddon } from 'xterm-addon-fit';

const terminal = new Terminal({
    allowTransparency : true,
    cursorBlink : true,
    convertEol : true,
    theme: {
        background : 'transparent'
    }
});

const fitAddon = new FitAddon();
terminal.loadAddon(fitAddon);

const AppTerminal = () => {
    const [shell, setShell] = useState("");
    const appTerminal = useRef();
    const terminalApp = document.getElementById("terminal")
    let command;
    let child;

    useEffect( async () => {
        let platformOS = await platform();
        setShell(platformOS === "win32" ? "powershell.exe" : "bash");
        terminal.open(terminalApp);
        fitAddon.fit();

        const command = new Command("powershell")
        command.on('close', data => {
            console.log(`command finished with code ${data.code} and signal ${data.signal}`)
        })
        command.on('error', error => console.error(`command error: "${error}"`))
        command.stdout.on('data', line => terminal.write(`${line}\n`))
        command.stderr.on('data', line => terminal.write(`${line}\n`))

        const child = await command.spawn()

        terminal.onData( (data) => {
            terminal.write(data);
            child.write(data);
        })

    }, [shell])
    return(
        <div className={'w-full h-full text-white pl-2'} ref={appTerminal} id={'terminal'}>

        </div>
    )
}

export default AppTerminal;
