import {createSlice, configureStore} from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        state: true,
        data: '',
        percent: 0
    },
    reducers: {
        setLoginProgressState(state, action) {
            state.state = action.payload
        },
        setData(state, action) {
            state.data = action.payload.data
            state.percent = action.payload.percent
        }
    },
    
})

const userLogin = createSlice({
    name: 'userLogin',
    initialState: {
        state: 'false',
        result: {}
    },
    reducers: {
        setLoginState(state, action) {
            state.state = action.payload
        },
        setResult(state, action) {
            state.result = action.payload
        }
    }
})


export default {
    store: configureStore({
        reducer: {
            loginState: loginSlice.reducer,
            login: userLogin.reducer
        }
    }),
    ...loginSlice.actions,
    ...userLogin.actions
}