import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';

import { setCurrentNavigation, fetchPage } from '../../store/actions/index';
import Aux from '../../hoc/Auxiliar/Auxiliar';
import Spinner from '../../components/UI/Spinner/Spinner';
import SectionTitle from '../../components/UI/Title/Primary';

const Terminos = () => {
    const navState = useSelector(state => state.nav);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( setCurrentNavigation('terminos') );

        dispatch( fetchPage('terminos') );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Aux>
            {navState.loading ?
                <Spinner />:
                <div className="text-container">
                    <SectionTitle text="Términos y condiciones" />
                    <div className="text">
                        {navState.content && parse(navState.content)}
                    </div>
                </div>}
        </Aux>
    );
};

export default Terminos;