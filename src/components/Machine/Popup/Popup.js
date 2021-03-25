import React from 'react';
import { Link } from "react-router-dom";

import CalendarData from '../Calendar/Data';
import Distance from '../Distance/Distance';
import MachineItem from '../Item';
import UserItem from '../../User/Item';
import { IconPlus, IconContact } from '../../UI/Icon/Icon';

const Popup = (props) => {
    const data = props.data;

    return (
        <div className="machine-popup">
            <div className="machine__calendar-data-cont">
                {/*<CalendarData />*/}
                {data.distancia ? <Distance data={data.distancia} />:null}
            </div>
            <div className="machine-popup-cont background">
                <div className="container">
                    <MachineItem data={data}>
                        <Link to={"/maquina/id/"+data.id}>
                            <IconPlus />
                        </Link>
                    </MachineItem>

                    <Link to={"/usuario/id/"+data.usuario.id} className="user__item">
                        <UserItem 
                            name={data.usuario.name} 
                            location={data.usuario.lugar} 
                            description={data.usuario.descripcion}>
                            
                            <div className="user__item__btn">
                                <IconPlus />
                            </div>
                        </UserItem>
                    </Link>

                    <div className="buttons-cont">
                        {/*<Link to='' className="button button--line calendar-btn">
                            <IconCalendar />
                            <span>Calendario</span>
                        </Link>*/}

                        <Link to={"/mi-cuenta/chat/usuario/"+data.usuario.id} className="button contact-btn">
                            <IconContact />
                            <span>Contactar</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;