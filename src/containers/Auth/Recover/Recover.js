import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Spinner from '../../../components/UI/Spinner/Spinner';
import SectionTitle from '../../../components/UI/Title/Primary';
import {recover, setCurrentNavigation} from '../../../store/actions/index';

const Recover = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = ( data, event ) => {
        event.preventDefault();
        dispatch(recover( data.username ));
    }

    useEffect( () => {
        dispatch( setCurrentNavigation('recuperar') );
    },[dispatch])
console.log(authState);
    return (
        <div>
            {authState.loading ? 
            <Spinner />:
            <div className="single-user recuperar">
                <div className="container">
                    <div className="container-fluid d-flex align-items-center justify-content-center">
                        <div className="loginFormContainer">
                            <fieldset className="border p-3 rounded">
                                <SectionTitle text="Recuperar contraseña" />
                                
                                {authState.error && <p className="error-msg">{authState.error}</p>}
                                {authState.recoverSuccess &&    <div className="contact-popup">
                                                                    <div className="row">
                                                                        <div className="row">
                                                                            <p className="success">Enviamos tu nueva contraseña temporal a tu email</p>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="buttons-cont">
                                                                                <Link to={'/login'} className="button button--line account-btn">
                                                                                    <span>Ingresar</span>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>}

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
                                        <div className="d-flex align-items-center">
                                            <button type="submit" className="button button--full">
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                }
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Recover;