import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    email: '',
    password: '', 
    newPassword: '',
    confirmPassword: '',  
    domain: '',
OTP: '',}

    const userSlice = createSlice({
        name:'user',
        initialState,
        reducers:{
            setEmail(state,action){
                state.email =action.payload
            },
            setPassword(state,action){
                state.password = action.payload
            },
            setNewPassWord(state,action){
                state.newPassword = action.payload
            },
            setConfirmPassword(state,action){
                state.confirmPassword = action.payload
            },
            setDomain(state,action){
                state.domain = action.payload
            },
            setOtp(state,action){
                state.OTP = action.payload
            }
        }
    }
    )

export const {setOtp,setEmail, setPassword, setDomain,setConfirmPassword,setNewPassWord} = userSlice.actions
export default userSlice.reducer