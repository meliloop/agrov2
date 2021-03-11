import React, { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import SectionTitle from '../../components/UI/Title/Primary';
import {auth,setCurrentNavigation} from '../../store/actions/index';

const Auth = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = ( data, event ) => {
        event.preventDefault();
        dispatch(auth( data.username, data.password ));
    }

    useEffect( () => {
        dispatch( setCurrentNavigation('login') );
    },[dispatch])

    let authRedirect = null
    if( authState.authSuccess )
        authRedirect =  <Redirect to="/mi-cuenta" />

    return (
        <div className="single-user login">
            {authRedirect}
            <div className="container">
                <div className="container-fluid d-flex align-items-center justify-content-center">
                    <div className="loginFormContainer">
                        <fieldset className="border p-3 rounded">
                            <SectionTitle text="Iniciar Sesión" />
                            {authState.error && <p>{authState.error.message}</p>}
                            {authState.registerSuccess   && <p>Te registraste correctamente.</p>}

                            {authState.loading ? 
                                <Spinner />:
                                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                    <div className="form-group">
                                    <label htmlFor="username">Email</label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="email"
                                        className="form-control"
                                        aria-describedby="Ingrese su email"
                                        placeholder="Email"
                                        ref={register({
                                        required: {
                                            value: true,
                                            message: "Por favor ingrese su email",
                                        },
                                        })}
                                    />
                                    {errors.username && (
                                        <span className="error mandatory">
                                        {errors.username.message}
                                        </span>
                                    )}
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Ingresar contraseña"
                                        ref={register({
                                        required: {
                                            value: true,
                                            message: "Por favor ingrese su contraseña",
                                        },
                                        })}
                                    />
                                    {errors.password && (
                                        <span className="error mandatory">
                                        {errors.password.message}
                                        </span>
                                    )}
                                    </div>
                                    <div className="d-flex align-items-center">
                                    <button type="submit" className="button button--full">
                                        Enviar
                                    </button>

                                    <Link to="/registracion" className="button button--line button--full ml-auto">Registrarse</Link>
                                    </div>
                                </form>
                            }
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;