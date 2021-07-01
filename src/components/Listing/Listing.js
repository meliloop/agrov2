import React from 'react';
import { Link } from "react-router-dom";

import Machine from '../Machine/Item';
import MachineType from '../Machine/Type/Item';
import Calendar from '../Machine/Calendar/Item';
import Feature from '../Machine/Feature/Item';
import User from '../User/Item';
import Chat from '../Chat/Item';
import Message from '../Chat/Message/Item';
import Empty from './Empty';

import {IconPlus, IconEdit} from '../UI/Icon/Icon';

const Listing = (props) => {
    return (
        <>
            {props.items.length ?
                props.items.map((item,index) => {
                    switch( props.type ){
                        case 'chat':
                            return (
                                <Chat key={item.id} data={item}>
                                    <div className="icon--container">
                                        <IconPlus />
                                    </div>
                                </Chat>
                            );
                        case 'message':
                            return <Message key={item.id} data={item} />;
                        case 'user':
                            return <User key={item.id} data={item} />;
                        case 'machine':
                            return (
                                <Machine key={item.id} data={item}>
                                    <Link 
                                        to={`${props.action === 'view' ? '':'/mi-cuenta'}/maquina/id/${item.id}`}
                                        className="icon--container">
                                        {props.action === 'view' ? <IconPlus />:<IconEdit />}
                                    </Link>
                                </Machine>
                            );
                        case 'machine-type':
                            return (
                                <MachineType 
                                    key={item.id} 
                                    data={item} 
                                    parentSelected={props.parentSelected}
                                    childsSelected={props.childsSelected}
                                    parentClick={props.parentClick}
                                    childClick={props.childClick} 
                                />
                            );
                        case 'machine-type-list':
                            return  (
                                <div key={index} className="single-machine__features__item">
                                    {item.title}
                                </div>
                            );
                        case 'feature':
                            return (
                                <Feature
                                    key={index}
                                    action={props.action}
                                    handleDelete={props.handleDelete}
                                    data={{descripcion:item.descripcion, id:index}}
                                 />
                            );
                        case 'calendar':
                            return (
                                <Calendar
                                    key={index}
                                    action={props.action}
                                    handleDelete={props.handleDelete}
                                    data={{place: item.lugar.address, to:item.hasta, from: item.desde, id:index}}
                                    />
                            );
                        default:
                            return <div key={index}>{item}</div>;
                    }
                }):
                <Empty />
            }
        </>
    );
};

export default Listing;