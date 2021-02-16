import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchMachine,setCurrentNavigation } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import BackgroundImage from '../../components/UI/Background/Image';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Distance from '../../components/Machine/Distance/Distance';
//import CalendarData from '../../components/Machine/Calendar/Data';
import UserItem from '../../components/User/Item';
import UserAvatar from '../../components/User/Avatar';
import SmallTitle from '../../components/UI/Title/Small';
import { IconContact, IconPlus, IconCalendar } from '../../components/UI/Icon/Icon';
import Listing from '../../components/Listing/Listing';

const Machine = (props) => {
    const machineState = useSelector(state => state.machine);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setCurrentNavigation('single') );
        dispatch( fetchMachine( { id: props.match.params.maquinaId} ) );
    },[dispatch, props.match.params.maquinaId]);
        
    if( machineState.error !== null )
        return <Redirect to="/" />;

    return (
        <Aux>
            <section className="single-machine">
                {(machineState.loading || !machineState.machine) ? 
                    <Spinner />:
                    <>
                        {machineState.machine.imagen &&
                        <div className="single-machine__image">
                            <BackgroundImage path={machineState.machine.imagen} />
                        </div>}

                        <div className="single-machine-cont">
                            <div className="container">
                                {/*<div className="machine__calendar-data-cont">
                                    <CalendarData />
                                    <Distance />
                                </div>*/}

                                {machineState.machine.caracteristicas &&
                                    <div className="single-machine__features">
                                        <SmallTitle text="Caracteristicas" />

                                        <Listing type="feature" action="view" items={machineState.machine.caracteristicas} />
                                    </div>
                                }

                                {machineState.machine.cabezales &&
                                    <div className="single-machine__features">
                                        <SmallTitle text="Tipos de cultivo" />
                                            
                                        <Listing type="machine-type-list" items={machineState.machine.cabezales} />
                                    </div>
                                }

                                <div className="single-machine__owner">
                                    <SmallTitle text="Dueño" />

                                    <Link to={"/usuario/id/"+machineState.member.id} className="user__item">
                                        <div className="user__image">
                                            <UserAvatar 
                                                name={machineState.member.name} 
                                                image={machineState.member.avatar}
                                            />
                                        </div>

                                        <UserItem 
                                            name={machineState.member.name} 
                                            location={machineState.member.lugar} 
                                            description={machineState.member.descripcion}
                                        />
                                        
                                        <div className="user__item__btn">
                                            <span><IconPlus /></span>
                                        </div>
                                    </Link>
                                </div>

                                <div className="buttons-cont">
                                    <div className="button button--line calendar-btn">
                                        <IconCalendar />
                                        <span>Calendario</span>
                                    </div>
                                        
                                    <Link to={"/mi-cuenta/chat/usuario/"+machineState.member.id} className="button contact-btn">
                                        <IconContact />
                                        <span>Contactar</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </section>
        </Aux>
    );
}

export default Machine;