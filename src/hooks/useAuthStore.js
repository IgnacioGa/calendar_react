import { useDispatch, useSelector } from "react-redux"
import {calendarApi} from "../api";
import { onchecking, onLogin, onLogout, clearErrorMessage, onlogoutCalendar } from "../store";


export const useAuthStore = () => {

    const {status, user, errorMessage, errorEmailMessage, errorPasswordMessage, respectiveForm} = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const handleErrorResponse = (data, form) => {
        if(data.detail){
            dispatch(onLogout({basic: data.detail, form: form}));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }else {
            dispatch(onLogout({...data, form: form}));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 6000)
        }
    }

    const startLogin = async({ email, password }) => {
        dispatch(onchecking())

        try {
            const {data} = await calendarApi.post('/auth/', {email, password});
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, id: data.id, email: data.email}))

        } catch (error) {
            const {data} = error.response
            handleErrorResponse(data, 'login')
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch(onchecking())

        try {
            const {data} = await calendarApi.post('/auth/create/', {name, email, password});
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, id: data.id, email: data.email}))

        } catch (error) {
            const {data} = error.response
            handleErrorResponse(data, 'register')
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token){
            return dispatch(onLogout())
        }
        try {
            const {data} = await calendarApi.post('/auth/refresh/',{ refresh: localStorage.getItem('refresh')})
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, id: data.id, email: data.email}))
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onlogoutCalendar());
        dispatch(onLogout());
    }


    return {
        // Properties
        status,
        user,
        errorMessage,
        errorEmailMessage,
        errorPasswordMessage,
        respectiveForm,

        // Metodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout
    }
}