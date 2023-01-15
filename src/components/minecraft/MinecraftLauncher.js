import { useDispatch, useSelector } from 'react-redux'
import {getMCLC} from "msmc"
import { Client } from 'minecraft-launcher-core'

const MinecraftLauncher = () => {
    const login = useSelector(state => state.login)
    const launcher = new Client()

    const launchMinecraft = () => {
        const opts = {
            clientPackage: null,
            authorization: getMCLC().getAuth(login.result),
            root: './minecraft',
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