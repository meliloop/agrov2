import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { setCurrentNavigation } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import {Logo} from '../../components/UI/Logo/Logo';
import Productor from '../../components/ComoFunciona/Productor';
import Contratista from '../../components/ComoFunciona/Contratista';

const ComoFunciona = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( setCurrentNavigation('como-funciona') );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

      <Aux>
      <div className="como-funciona-cont">
        <div className="logo__image">
            <Logo />
        </div>

        <div className="text-container">
            <Productor />
            <Contratista />
        </div>
      </div>
      </Aux>
    );
};

export default ComoFunciona;
