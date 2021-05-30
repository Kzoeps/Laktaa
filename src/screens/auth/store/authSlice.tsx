import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from 'src/screens/auth/models/models'

const initialState: AuthState = {
    userName: '',
    userId: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export default authSlice.reducer
