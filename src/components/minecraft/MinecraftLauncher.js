import { useDispatch, useSelector } from 'react-redux'
import {getMCLC} from "msmc"
import { Client } from 'minecraft-launcher-core'
import os from 'os'
import path from 'path';
import fs from 'fs';

const MinecraftLauncher = () => {
    const login = useSelector(state => state.login)
    const launcher = new Client()
    let javaPath
    if (os.platform() === 'win32') {
        const javaDir = fs.readdirSync(path.join('C:', 'Program Files', 'Java'))
        javaDir.forEach((dir) => {
            if (dir.startsWith('jdk-17')) {
                javaPath = path.join('C:', 'Program Files', 'Java', dir, 'bin', 'java.exe')
            }
        })
    } else if (os.platform() === 'linux') {
        const javaDir = fs.readdirSync(path.join('/', 'usr', 'lib', 'jvm'))
        javaDir.forEach((dir) => {
            if (dir.startsWith('jdk-17')) {
                javaPath = path.join('/', 'usr', 'lib', 'jvm', dir, 'bin', 'java')
            }
        })
    } else if (os.platform() === 'darwin') {
        const javaDir = fs.readdirSync(path.join('/', 'Library', 'Java', 'JavaVirtualMachines'))
        javaDir.forEach((dir) => {
            if (dir.startsWith('jdk-17')) {
                javaPath = path.join('/', 'Library', 'Java', 'JavaVirtualMachines', dir, 'Contents', 'Home', 'bin', 'java')
            }
        })
    } else {
        javaPath = path.join('/', 'usr', 'bin', 'java')
    }
    console.log('Java Path', javaPath)

    

    const launchMinecraft = () => {
        const opts = {
            clientPackage: null,
            authorization: getMCLC().getAuth(login.result),
            root: './minecraft',
            javaPath,
            version: {
                number: '1.18.2',
                type: 'release',
                custom: 'fabric-loader-0.14.12-1.18.2'
            },
            memory: {
                max: '4G',
                min: '1G'
            },
        }
        console.log('starting minecraft')
        launcher.launch(opts)
        launcher.on('debug', (e) => console.log(e))
        launcher.on('data', (e) => console.log(e))
    }
    if (login.state === 'true') {
        return <button className='btn btn-outline-primary' onClick={launchMinecraft}>Launch Minecraft</button>
    } else {
        return <button className='btn btn-outline-primary disabled' disabled>Launch Minecraft</button>
    }
}

export default MinecraftLauncher