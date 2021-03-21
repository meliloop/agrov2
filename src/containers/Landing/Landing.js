import React from 'react';

import { Link } from 'react-router-dom';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import {Logo} from '../../components/UI/Logo/Logo';

const Landing = () => {

    return (
        <Aux>
            <div className="landing--container">
                <div className="logo__image">
                    <Logo />
                </div>

                <Link to={'/login'} className="button button--line account-btn">Iniciar</Link>
                <Link to={'/registracion'} className="button button--line button--full ml-auto">Registrarse</Link>
                <Link to={'#'} className="button button--line account-btn" id="buttonInstall">Instalar</Link>

                <Link to={'/terminos'} className="link">Términos y condiciones</Link>
                <Link to={'/politicas'} className="Link">Políticas de privacidad</Link>
            </div>
        </Aux>
    )
};

export default Landing;