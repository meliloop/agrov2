import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentNavigation, fetchMessages, sendMessage, fetchMember } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import UserItem from '../../components/User/Item';
import BackgroundImage from '../../components/UI/Background/Image';
import SectionTitle from '../../components/UI/Title/Primary';
import SmallTitle from '../../components/UI/Title/Small';
import Spinner from '../../components/UI/Spinner/Spinner';
import Listing from '../../components/Listing/Listing';
import { IconRightArrow } from '../../components/UI/Icon/Icon';
import { ClickAwayListener } from '@material-ui/core';

function useInterval(callback, delay){
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if( delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const Chat = (props) => {
    const [newMessageText, setNewMessageText] = useState('');
    const [contactPopupIsOpen, setContactPopupIsOpen] = useState(false);
    const authState= useSelector(state => state.auth);
    const msgState = useSelector(state => state.messenger);
    const memberState = useSelector(state => state.member);
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

    const getMessages = () => {
        if( authState.token )
            dispatch( fetchMessages(authState.token, { other: props.match.params.usuarioId, me: authState.userId }) );
    };

    const handleCompartir = () => {
        dispatch(sendMessage(authState.token,{to: props.match.params.usuarioId, from: authState.userId, message: `Mi Telefono: <a href="tel:+${authState.data.phone}">${authState.data.phone}</a>`}));
        dispatch(sendMessage(authState.token,{to: props.match.params.usuarioId, from: authState.userId, message: `Mi whatsapp: <a href="https://wa.me/${authState.data.whatsapp}" target="_blank">${authState.data.whatsapp}</a>`}));
        dispatch(sendMessage(authState.token,{to: props.match.params.usuarioId, from: authState.userId, message: `Mi email: <a href="mailto:${authState.data.email}">${authState.data.email}</a>`}));

        setContactPopupIsOpen(false);
    };

    useEffect( () => {
        if( authState.token ){
            dispatch( setCurrentNavigation('single') );
                
            //  load contact data 
            dispatch( fetchMember( { id: props.match.params.usuarioId } ) );

            //  load messages
            getMessages();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState.token, authState.userId, props.match.params.usuarioId]);

    useInterval(() => {
        getMessages();
    }, 1000);

    return (
        <Aux>
            {(authState.data && contactPopupIsOpen) && 
            <ClickAwayListener onClickAway={() => setContactPopupIsOpen(false)}>
                <div className={`contact-popup ${contactPopupIsOpen ? 'open':'hidden'}`} style={{width: '300px', height: '300px'}}>
                    <div className="row">
                        <SectionTitle text="DATOS DE CONTACTO" />

                        {authState.data.phone &&
                        <div className="row">
                            <SmallTitle text="TELÉFONO" />
                            <div className="data-cont">{authState.data.phone}</div>
                        </div>}
                            
                        {authState.data.whatsapp &&
                        <div className="row">
                            <SmallTitle text="WHATSAPP" />
                            <div className="data-cont">{authState.data.whatsapp}</div>
                        </div>}
                            
                        {authState.data.email &&
                        <div className="row">
                            <SmallTitle text="EMAIL" />
                            <div className="data-cont">{authState.data.email}</div>
                        </div>}

                        <div className="row">
                            <div className="buttons-cont">
                                <div
                                    className="button button--line contact-btn" 
                                    onClick={handleCompartir}
                                >
                                    <span>Compartir</span>
                                </div>
                                <div 
                                    className="button button--line"
                                    onClick={() => setContactPopupIsOpen(false)}>
                                    <span>Cancelar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ClickAwayListener>}

            <section className="dashboard chat">
                {memberState.member &&
                <div className="chat-cont">
                    <div className="container">
                        <div className="user__item">
                            <div className="user__image">
                                {memberState.member.avatar &&
                                <BackgroundImage 
                                    alt={memberState.member.name} 
                                    path={memberState.member.avatar}
                                />}
                            </div>

                            <UserItem 
                                name={memberState.member.name} 
                                location={memberState.member.lugar} 
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
                </div>}
                
                <div className="messages-cont">
                {msgState.loading && !msgState.messages ? 
                    <Spinner />:
                    <Listing type="message" items={msgState.messages} />}
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
        </Aux>
    );
}

export default Chat;