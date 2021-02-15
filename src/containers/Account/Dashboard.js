import React, { useEffect,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentNavigation, fetchUser, fetchChats, fetchUnreadMessages } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import UserItem from '../../components/User/Item';
import BackgroundImage from '../../components/UI/Background/Image';
import Spinner from '../../components/UI/Spinner/Spinner';
import {IconAccount,IconMachine,IconContact,IconPlus} from '../../components/UI/Icon/Icon';
import Listing from '../../components/Listing/Listing';
import EmptyList from '../../components/Listing/Empty';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('machine');
    const authState= useSelector(state => state.auth);
    const msgState = useSelector(state => state.messenger);

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( setCurrentNavigation('account') );

        //dispatch( fetchUnreadMessages(authState.token,authState.userId) );
        //dispatch( fetchUser(authState.token, authState.userId) );
        //dispatch( fetchChats(authState.token,authState.userId) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);

    return (
        <Aux>
            <section className="dashboard">
                {authState.data &&
                <div className="dashboard-cont">
                    <div className="container">
                        <div className="user__item">
                            {authState.data.avatar &&
                            <div className="user__image">
                                <BackgroundImage 
                                    alt={authState.data.name} 
                                    path={authState.data.avatar}
                                />
                            </div>}

                            <UserItem 
                                name={authState.data.name} 
                                location={authState.data.lugar} 
                                description={authState.data.descripcion}
                            />
                        </div>

                        <div className="buttons-cont">
                            <Link to="/mi-cuenta/editar" className="button button--line account-btn">
                                <IconAccount />
                                <span>Mi Cuenta</span>
                            </Link>
                        </div>
                    </div>
                </div>}
                
                <div className="dashboard__tabs">
                    <div 
                        className={`dashboard__tabs__item${activeTab === 'machine' ? ' active':''}`}
                        onClick={() => setActiveTab('machine')}
                    >
                        <IconMachine />
                        <span>Maquinaria</span>
                    </div>
                    <div 
                        className={`dashboard__tabs__item${activeTab === 'chat' ? ' active':''}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        <IconContact />
                        <span>Mensajes</span>
                        {msgState.unread && 
                            <span className="new">{msgState.unread}</span>}
                    </div>
                </div>
                    
                <div 
                    className={`dashboard__tab${activeTab === 'machine' ? ' active':''}`}
                >
                    <div className="link-container calendar-cont__add">
                        <Link to="/mi-cuenta/agregar" className="link">
                            <IconPlus />
                            AGREGAR MAQUINARIA NUEVA
                        </Link>
                    </div>
                    {authState.data && authState.data.maquinarias && 
                    <Listing
                        type="machine" 
                        action="edit" 
                        items={authState.data.maquinarias} 
                    />}
                </div>

                <div 
                    className={`dashboard__tab${activeTab === 'chat' ? ' active':''}`}
                >
                    {msgState.loading ?
                        <Spinner/>:
                        (msgState.chats ?
                            <Listing
                                type="chat"  
                                items={msgState.chats}
                            />:
                            <EmptyList text="No tenes chats"/>)
                    }
                </div>
            </section>
        </Aux>
    );
};

export default Dashboard;