import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import SectionTitle from '../../../components/UI/Title/Primary';
import SmallTitle from '../../../components/UI/Title/Small';
import BackgroundImage from '../../../components/UI/Background/Image';

import {userRegister, userUpdate, fetchUser, setCurrentNavigation, clearAuthErrors} from '../../../store/actions/index';

const Register = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const [avatar, setAvatar] = useState(null);

    const onFileUpload = (event) => {
        event.preventDefault();

        let file_reader = new FileReader();
        let file = event.target.files[0];
        file_reader.onload = () => setAvatar(file_reader.result);
        file_reader.readAsDataURL(file);
    }

    const onSubmit = ( data, event ) => {
        event.preventDefault();
        data.avatar = avatar;

        localStorage.getItem('userId')  ?   
            dispatch(userUpdate(authState.token, authState.userId, data)) :
            dispatch(userRegister( data ));
    }

    useEffect( () => {
        dispatch( clearAuthErrors() );

        if( authState.token ){
            dispatch( setCurrentNavigation('account-edit') );
            //  get user data 
            dispatch(fetchUser(authState.token, authState.userId));

            if( authState.loading === false && authState.data ){
                setAvatar(authState.data.avatar);
            }
        }else{
            dispatch( setCurrentNavigation('register') );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState.userId]);

    return (
        <div className="single-user login">
            <div className="container">
                <div className="container-fluid d-flex align-items-center justify-content-center">
                    <div className="registrationFormContainer">
                        <fieldset className="border p-3 rounded">
                            <SectionTitle text={authState.token ? 'Mi Cuenta':'Registración'} />
                                
                            {authState.registerSuccess && <Redirect to="/login" />}
                            {authState.error && <div className="error-msg">{authState.error}</div>}
                            {authState.updateSuccess && <div className="success">Sus datos fueron actualizados correctamente</div>}

                            {authState.loading ? 
                                <CircularProgress />:
                                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            aria-describedby="Ingrese su nombre"
                                            placeholder="Nombre"
                                            defaultValue={authState.data?.name}
                                            ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese su nombre",
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Mínimo 6 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 255 caracteres",
                                            },
                                            })}
                                        />
                                        {errors.name && (
                                            <span className="error mandatory">
                                            {errors.name.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lugar">Zona de actividad</label>
                                        <input
                                            id="lugar"
                                            name="lugar"
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            aria-describedby="Ingrese su sona de actividad"
                                            placeholder="Zona de actividad"
                                            defaultValue={authState.data?.lugar}
                                            ref={register({
                                            required: {
                                                value: false,
                                                message: "Por favor ingrese su zona de actividad",
                                            },
                                            minLength: {
                                                value: 4,
                                                message: "Mínimo 4 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 255 caracteres",
                                            },
                                            })}
                                        />
                                        {errors.lugar && (
                                            <span className="error mandatory">
                                            {errors.lugar.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="avatar">Foto</label>
                                        <div className="upload-btn-wrapper">
                                            <button className="btn-upload button" title="Haga clic para seleccionar el archivo">Seleccionar foto</button>
                                            <input 
                                                type="file" 
                                                id="avatar"
                                                name="avatar"
                                                accept=".jpg,.gif,.jpeg,.png"
                                                onChange={onFileUpload}
                                                />
                                            {avatar && 
                                                <div className="user__image">
                                                    <BackgroundImage path={avatar} alt="Imágen seleccionada" />
                                                </div>}
                                            {(authState.data?.avatar && !avatar) &&
                                                <div className="user__image">
                                                    <BackgroundImage path={authState.data?.avatar} alt="Imágen seleccionada" />
                                                </div>}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="descripcion">Presentación (ocupación, edad, zona)</label>
                                        <textarea
                                            id="descripcion"
                                            name="descripcion"
                                            type="text"
                                            autoComplete="off"
                                            className="form-control form-textarea"
                                            aria-describedby="Ingrese su descripción"
                                            placeholder="Por favor ingrese su ocupación, edad y zona"
                                            defaultValue={authState.data?.descripcion}
                                            ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese su descripción",
                                            },
                                            minLength: {
                                                value: 10,
                                                message: "Mínimo 10 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 255 caracteres",
                                            },
                                            })}
                                        />
                                        {errors.descripcion && (
                                            <span className="error mandatory">
                                            {errors.descripcion.message}
                                            </span>
                                        )}
                                    </div>

                                    <SmallTitle text="Datos de contacto" extraClass="small-title--white" />

                                    <div className="form-group">
                                        <label htmlFor="phone">Teléfono</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="number"
                                            autoComplete="on"
                                            className="form-control"
                                            aria-describedby="Ingrese su teléfono"
                                            placeholder="Teléfono"
                                            defaultValue={authState.data?.phone}
                                            ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese su teléfono",
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Mínimo 6 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 20 caracteres",
                                            },
                                            })}
                                        />
                                        {errors.phone && (
                                            <span className="error mandatory">
                                            {errors.phone.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="whatsapp">WhatsApp</label>
                                        <input
                                            id="whatsapp"
                                            name="whatsapp"
                                            type="number"
                                            autoComplete="on"
                                            className="form-control"
                                            aria-describedby="Ingrese su whatsapp"
                                            placeholder="Whatsapp"
                                            defaultValue={authState.data?.whatsapp}
                                            ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese su whatsapp",
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Mínimo 6 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 20 caracteres",
                                            },
                                            })}
                                        />
                                        {errors.whatsapp && (
                                            <span className="error mandatory">
                                            {errors.whatsapp.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="on"
                                            className="form-control"
                                            aria-describedby="Email"
                                            placeholder="Email"
                                            readOnly={authState.token}
                                            defaultValue={authState.data?.email}
                                            ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese su email",
                                            },
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Por favor ingrese un email válido",
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Mínimo 6 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 255 caracteres",
                                            },
                                            })}
                                        />
                                        {errors.email && (
                                            <span className="error mandatory">
                                            {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {!authState.token &&
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="password"
                                            autoComplete="off"
                                            placeholder="Password"
                                            ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese un password",
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Mínimo 6 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 255 caracteres",
                                            },
                                            })}
                                        />
                                        {errors.password && (
                                            <span className="error mandatory">
                                            {errors.password.message}
                                            </span>
                                        )}
                                    </div>}

                                    <div className="d-flex align-items-center justify-content-center">
                                        <button type="submit" className="button button--full btn-outline-primary">
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            }
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>);
}

export default Register;