import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchService,setCurrentNavigation } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import BackgroundImage from '../../components/UI/Background/Image';
import Spinner from '../../components/UI/Spinner/Spinner';
import CalendarData from '../../components/Machine/Calendar/Data';
import UserItem from '../../components/User/Item';
import UserAvatar from '../../components/User/Avatar';
import SmallTitle from '../../components/UI/Title/Small';
import { IconContact, IconPlus, IconCalendar } from '../../components/UI/Icon/Icon';
import Listing from '../../components/Listing/Listing';

const Service = (props) => {
    const serviceState = useSelector(state => state.service);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setCurrentNavigation('single') );
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
                        {serviceState.service.imagen ?
                        <div className="single-machine__image">
                            <BackgroundImage path={serviceState.service.imagen} />
                        </div>:
                        <div className="single-machine__image placeholder-image">
                        </div>}

                        <div className="single-machine-cont">
                            <div className="container">
                                <div className="machine__calendar-data-cont">
                                    <CalendarData data={serviceState.service} />
                                </div>
                                <div className="machine__item">
                                    {serviceState.service.tipo &&
                                    <div className="machine__icon">
                                        <BackgroundImage path={serviceState.service.tipo.icono} alt={serviceState.service.tipo.title} />
                                    </div>}
                                    <div className="machine__item__data">
                                        {serviceState.service.tipo &&
                                        <div className="machine__item__name h3">
                                            {serviceState.service.tipo.title}
                                        </div>}
                                        <div className="machine__item__model h3">
                                            <strong>{serviceState.service.modelo}</strong>
                                        </div>
                                    </div>
                                    <div className="machine__item__btn">
                                        <span>{serviceState.service.year}</span>
                                    </div>
                                </div>

                                {serviceState.service.caracteristicas &&
                                    <div className="single-machine__features">
                                        <SmallTitle text="Caracteristicas" />

                                        <Listing type="feature" action="view" items={serviceState.service.caracteristicas} />
                                    </div>}

                                <div className="single-machine__owner">
                                    <SmallTitle text="Dueño" />

                                    {serviceState.member &&
                                    <Link to={"/usuario/id/"+serviceState.member.id} className="user__item">
                                        {serviceState.member.avatar &&
                                        <div className="user__image">
                                            <UserAvatar 
                                                name={serviceState.member.name} 
                                                image={serviceState.member.avatar}
                                            />
                                        </div>}

                                        <UserItem 
                                            name={serviceState.member.name} 
                                            location={serviceState.member.lugar} 
                                            description={serviceState.member.descripcion}
                                        />
                                        
                                        <div className="user__item__btn">
                                            <span><IconPlus /></span>
                                        </div>
                                    </Link>}
                                </div>

                                <div className="buttons-cont">
                                    {(serviceState.fechas && serviceState.fechas.length) ?
                                    <Link to={"/servicio/calendario/"+serviceState.service.id} className="button button--line calendar-btn">
                                        <IconCalendar />
                                        <span>Calendario</span>
                                    </Link>:''}
                                        
                                    {serviceState.member && 
                                    <Link to={"/mi-cuenta/chat/usuario/"+serviceState.member.id} className="button contact-btn">
                                        <IconContact />
                                        <span>Contactar</span>
                                    </Link>}
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