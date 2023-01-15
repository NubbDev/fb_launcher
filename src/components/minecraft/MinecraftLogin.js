import msmc from "msmc"
import fetch from "node-fetch";
import { useDispatch, useSelector } from 'react-redux'
import store from "../../store";

const MinecraftLogin = () => {
    const loginState = useSelector(state => state.loginState)
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()


    console.log(login)
    const loginHandler = async () => {
        msmc.setFetch(fetch);
        const token = msmc.mojangAuthToken('login')
        const logLaunch = await msmc.launch('nwjs', token, update => {
            dispatch(store.setLoginState('progress'))
            dispatch(store.setLoginProgressState(true))
            dispatch(store.setData(update))
        })
        if (msmc.errorCheck(logLaunch)) {
            dispatch(store.setLoginState('false'))
            dispatch(store.setLoginProgressState(false))
            return
        }
        dispatch(store.setLoginState('true'))
        dispatch(store.setLoginProgressState(false))
        dispatch(store.setResult(logLaunch))
      }

    if (login.state === 'true') {
        return <button className='btn btn-outline-success'>Logged in</button>
    } else if (login.state === 'false') {
        return <button className='btn btn-outline-danger' onClick={loginHandler}>Login</button>
    } else if (login.state === 'progress') {
        return <button className='btn btn-outline-danger' onClick={loginHandler}>{loginState.data}</button>
    }
}

export default MinecraftLogin