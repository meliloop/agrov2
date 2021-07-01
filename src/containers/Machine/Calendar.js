import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchMachine,setCurrentNavigation } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Spinner from '../../components/UI/Spinner/Spinner';
import SectionTitle from '../../components/UI/Title/Primary';
import { IconContact } from '../../components/UI/Icon/Icon';
import Listing from '../../components/Listing/Listing';
import EmptyList from '../../components/Listing/Empty';

const Machine = (props) => {
    const machineState = useSelector(state => state.machine);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setCurrentNavigation('calendar') );
        dispatch( fetchMachine( { id: props.match.params.maquinaId} ) );
    },[dispatch, props.match.params.maquinaId]);
        
    if( machineState.error !== null )
        return <Redirect to="/" />;
        
    return (
        <Aux>
            <section className="single-machine">
                {(machineState.loading || !machineState.machine) ? 
                    <Spinner />:
                    <div>
                        <div className="single-machine-cont">
                            <div className="container">
                                <div className="buttons-cont">
                                    <Link to={"/mi-cuenta/chat/usuario/"+machineState.member.id} className="button contact-btn">
                                        <IconContact />
                                        <span>Contactar</span>
                                    </Link>
                                </div>

                                <SectionTitle text="CALENDARIO DE MAQUINA" />

                                <div className="calendar-cont">
                                    {(machineState.fechas && machineState.fechas.length) ?
                                    <div className="calendar-cont__list">
                                        <Listing
                                            type="calendar"
                                            action="view"
                                            items={machineState.fechas}
                                        />
                                    </div>:
                                    <EmptyList text="No hay fechas disponibles para esta máquina"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Aux>
    );
}

export default Machine;