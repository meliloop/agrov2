import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentNavigation, fetchMessages, setReadedMessages, sendMessage } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import UserItem from '../../components/User/Item';
import BackgroundImage from '../../components/UI/Background/Image';
import SectionTitle from '../../components/UI/Title/Primary';
import SmallTitle from '../../components/UI/Title/Small';
import Spinner from '../../components/UI/Spinner/Spinner';
import Listing from '../../components/Listing/Listing';
import { IconRightArrow } from '../../components/UI/Icon/Icon';
import { ClickAwayListener } from '@material-ui/core';

const Chat = (props) => {
    const [newMessageText, setNewMessageText] = useState('');
    const [contactPopupIsOpen, setContactPopupIsOpen] = useState(false);
    const authState= useSelector(state => state.auth);
    const msgState = useSelector(state => state.messenger);
    const dispatch = useDispatch();

    const handleNewMessage = () => {
        if( newMessageText !== '' ){
            dispatch(sendMessage(authState.token,{
                        to: props.match.params.usuarioId, 
                        from: authState.userId,
                        message: newMessageText
                    }));
            setNewMessageText('');
        }
    };

    useEffect( () => {
        if( authState.token ){
            dispatch( setCurrentNavigation('chat') );

            //  load messages
            dispatch( fetchMessages(authState.token, { other: props.match.params.usuarioId, me: authState.userId }) );

            //  set messages as read
            dispatch( setReadedMessages() );
        }
    },[authState.token, authState.userId, dispatch, props.match.params.usuarioId]);

    return (
        <Aux>
            {(msgState.loading || !msgState.contact) ?
            <Spinner />:
            <>
                {(msgState.contact && contactPopupIsOpen) && 
                <ClickAwayListener onClickAway={() => setContactPopupIsOpen(false)}>
                    <div className={`contact-popup ${contactPopupIsOpen ? 'open':'hidden'}`} style={{width: '300px', height: '300px'}}>
                        <SectionTitle text="DATOS DE CONTACTO" />

                        {msgState.contact.phone &&
                        <div className="row">
                            <SmallTitle text="TELÉFONO" />
                            <div className="data-cont">{msgState.contact.phone}</div>
                        </div>}
                            
                        {msgState.contact.whatsapp &&
                        <div className="row">
                            <SmallTitle text="WHATSAPP" />
                            <div className="data-cont">{msgState.contact.whatsapp}</div>
                        </div>}
                            
                        {msgState.contact.email &&
                        <div className="row">
                            <SmallTitle text="EMAIL" />
                            <div className="data-cont">{msgState.contact.email}</div>
                        </div>}
                    </div>
                </ClickAwayListener>}

                <section className="dashboard chat">
                    <div className="chat-cont">
                        <div className="container">
                            <div className="user__item">
                                <div className="user__image">
                                    <BackgroundImage 
                                        alt={msgState.contact.name} 
                                        path={msgState.contact.avatar}
                                    />
                                </div>

                                <UserItem 
                                    name={msgState.contact.name} 
                                    location={msgState.contact.lugar} 
                                />

                                <div className="buttons-cont">
                                    <div 
                                        className="button button--line contact-btn" 
                                        onClick={() => setContactPopupIsOpen(true)}
                                    >
                                        <span>Compartir datos de contacto</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="messages-cont">
                        <Listing type="message" items={msgState.messages} />
                    </div>

                    <div className="new-message-cont">
                        <input
                            id="newmessage"
                            name="newmessage"
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            aria-describedby="Escribir mensaje"
                            placeholder="Escribir mensaje"
                            value={newMessageText}
                            onChange={(e) => setNewMessageText(e.target.value)}
                        />

                        <div className="buttons-cont">
                            <div className="button" onClick={handleNewMessage}>
                                <IconRightArrow />
                            </div>
                        </div>
                    </div>
                </section>
            </>}
        </Aux>
    );
}

export default Chat;