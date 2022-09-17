import { useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    const {startLogin, startRegister, errorMessage, errorEmailMessage, errorPasswordMessage, respectiveForm} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange: onLogininputChange} = useForm(registerFormFields);
    const {registerName, registerEmail, registerPassword ,registerPassword2, onInputChange: onRegisterinputChange} = useForm(loginFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({email: loginEmail, password: loginPassword})
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        if(registerPassword !== registerPassword2){
            Swal.fire('Error en el registro', 'Contraseña no son iguales', 'error')
            return;
        }
        startRegister({name: registerName, email: registerEmail, password: registerPassword })
    }

    useEffect(() => {
        if(errorMessage !== undefined){
            if (typeof errorMessage !== 'object' && !Array.isArray(errorMessage)){
                Swal.fire('Error en la autenticacion', errorMessage, 'error')
            }
        }
    }, [errorMessage])
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className={`form-control ${errorEmailMessage && respectiveForm === 'login' ? 'is-invalid' : ''}`}
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLogininputChange}
                            />
                            {
                                errorEmailMessage && respectiveForm === 'login'
                                    ? <div className="invalid-feedback">{errorEmailMessage}</div>
                                    : ''
                            }
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className={`form-control ${errorPasswordMessage && respectiveForm === 'login' ? 'is-invalid' : ''}`}
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLogininputChange}
                            />
                            {
                                errorPasswordMessage && respectiveForm === 'login'
                                    ? <div className="invalid-feedback">{errorPasswordMessage}</div>
                                    : ''
                            }
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterinputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className={`form-control ${errorEmailMessage && respectiveForm === 'register' ? 'is-invalid' : ''}`}
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterinputChange}
                            />
                            {
                                errorEmailMessage && respectiveForm === 'register'
                                    ? <div className="invalid-feedback white-feedback">{errorEmailMessage}</div>
                                    : ''
                            }
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className={`form-control ${errorPasswordMessage && respectiveForm === 'register' ? 'is-invalid' : ''}`}
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterinputChange} 
                            />
                            {
                                errorPasswordMessage && respectiveForm === 'register'
                                    ? <div className="invalid-feedback white-feedback">{errorPasswordMessage}</div>
                                    : ''
                            }
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterinputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}