import { createSlice } from "@reduxjs/toolkit";

export const statusOptions = {
    checking: 'checking',
    authenticated: 'authenticated',
    notAuthenticated: 'not-authenticated'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: statusOptions.checking, // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: undefined,
        errorEmailMessage: undefined,
        errorPasswordMessage: undefined,
        respectiveForm: undefined,
    },
    reducers: {
        onchecking: (state) => {
            state.status = statusOptions.checking
            state.user = {}
            state.errorMessage = undefined
            state.errorEmailMessage = undefined
            state.errorPasswordMessage = undefined
            state.respectiveForm = undefined
        },
        onLogin: (state, {payload}) => {
            state.status = statusOptions.authenticated
            state.user = payload
            state.errorMessage = undefined
            state.errorEmailMessage = undefined
            state.errorPasswordMessage = undefined
            state.respectiveForm = undefined
        },
        onLogout: (state, {payload}) => {
            state.status = statusOptions.notAuthenticated
            state.user = {}
            state.errorMessage = payload && payload.basic !== undefined ? payload.basic : undefined
            state.errorEmailMessage = payload && payload.email !== undefined ? payload.email[0] : undefined
            state.errorPasswordMessage = payload && payload.password !== undefined ? payload.password[0] : undefined
            state.respectiveForm = payload && payload.form !== undefined ? payload.form : undefined
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
            state.errorEmailMessage = undefined
            state.errorPasswordMessage = undefined
            state.respectiveForm = undefined
        },
    }
});

export const {onchecking, onLogin, onLogout, clearErrorMessage} = authSlice.actions