import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchService,setCurrentNavigation } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Spinner from '../../components/UI/Spinner/Spinner';
import SectionTitle from '../../components/UI/Title/Primary';
import { IconContact } from '../../components/UI/Icon/Icon';
import Listing from '../../components/Listing/Listing';
import EmptyList from '../../components/Listing/Empty';

const Service = (props) => {
    const serviceState = useSelector(state => state.service);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setCurrentNavigation('calendar') );
        dispatch( fetchService( { id: props.match.params.servicioId} ) );
    },[dispatch, props.match.params.servicioId]);
        
    if( serviceState.error !== null )
        return <Redirect to="/" />;
        
    return (
        <Aux>
            <section className="single-machine">
                {(serviceState.loading || !serviceState.service) ? 
                    <Spinner />:
                    <div>
                        <div className="single-machine-cont">
                            <div className="container">
                                <div className="buttons-cont">
                                    <Link to={"/mi-cuenta/chat/usuario/"+serviceState.member.id} className="button contact-btn">
                                        <IconContact />
                                        <span>Contactar</span>
                                    </Link>
                                </div>

                                <SectionTitle text="CALENDARIO DE MAQUINA" />

                                <div className="calendar-cont">
                                    {(serviceState.fechas && serviceState.fechas.length) ?
                                    <div className="calendar-cont__list">
                                        <Listing
                                            type="calendar"
                                            action="view"
                                            items={serviceState.fechas}
                                        />
                                    </div>:
                                    <EmptyList text="No hay fechas disponibles para este servicio"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Aux>
    );
}

export default Service;