import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    userId: string
    email: string
    token: string
    role: 'admin' | 'user'
}

interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
