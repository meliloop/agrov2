import React from 'react';

import { Link } from 'react-router-dom';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import {Logo} from '../../components/UI/Logo/Logo';

const Landing = () => {

    return (
        <Aux>
            <div className="landing--container">
              <div className="buttons--cont">
                  <div className="logo__image">
                      <Logo />
                  </div>

                  <div className="row"><Link to={'/login'} className="button account-btn">Iniciar</Link></div>
                  <div className="row"><Link to={'/registracion'} className="button button--line ml-auto">Registrarse</Link></div>
              </div>
              <div className="links--cont">
                  <Link to={'/terminos'} className="link">Términos y condiciones</Link>
                  <Link to={'/politicas'} className="Link">Políticas de privacidad</Link>
              </div>
            </div>
        </Aux>
    )
};

export default Landing;