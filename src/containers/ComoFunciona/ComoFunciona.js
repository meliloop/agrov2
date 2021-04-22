import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { setCurrentNavigation } from '../../store/actions/index';

import Productor from '../../components/ComoFunciona/Productor';
import Contratista from '../../components/ComoFunciona/Contratista';

const ComoFunciona = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( setCurrentNavigation('como-funciona') );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="text-container">
            <Productor />
            <Contratista />
        </div>
    );
};

export default ComoFunciona;