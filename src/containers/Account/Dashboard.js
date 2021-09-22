import React, { useEffect,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentNavigation, fetchUser } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import UserItem from '../../components/User/Item';
import BackgroundImage from '../../components/UI/Background/Image';
import Spinner from '../../components/UI/Spinner/Spinner';
import Listing from '../../components/Listing/Listing';
import EmptyList from '../../components/Listing/Empty';
import {IconAccount,IconPlus} from '../../components/UI/Icon/Icon';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('chat');
    const userState= useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( setCurrentNavigation('account') );

        dispatch( fetchUser(localStorage.getItem('token'), localStorage.getItem('userId')) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);
        
    if( userState.error !== null )
        return <Redirect to="/" />;
        
    return (
        <Aux>
            {(userState.loading || !userState.data) ?
            <Spinner />
            :
            <section className="dashboard">
                <div className="dashboard-cont">
                    <div className="container">
                        <div className="user__item">
                            {userState.data.avatar &&
                            <div className="user__image">
                                <BackgroundImage 
                                    alt={userState.data.name} 
                                    path={userState.data.avatar}
                                />
                            </div>}

                            <UserItem 
                                name={userState.data.name} 
                                location={userState.data.lugar} 
                                description={userState.data.descripcion}
                            />
                        </div>

                        <div className="buttons-cont">
                            <Link to="/mi-cuenta/editar" className="button button--line account-btn">
                                <IconAccount />
                                <span>Mi Cuenta</span>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="dashboard__tabs">
                    <div 
                        className={`dashboard__tabs__item${activeTab === 'machine' ? ' active':''}`}
                        onClick={() => setActiveTab('machine')}
                    >
                        {/* <IconMachine /> */}
                        <span>Maquinaria</span>
                    </div>
                    <div 
                        className={`dashboard__tabs__item${activeTab === 'service' ? ' active':''}`}
                        onClick={() => setActiveTab('service')}
                    >
                        {/* <IconService /> */}
                        <span>Servicios</span>
                    </div>
                    <div 
                        className={`dashboard__tabs__item${activeTab === 'chat' ? ' active':''}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        {/* <IconContact /> */}
                        <span>Mensajes</span>
                        {userState.data.unread > 0 && 
                            <span className="new">{userState.data.unread}</span>}
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
                    {userState.data && userState.data.maquinarias && 
                    <Listing
                        type="machine" 
                        action="edit" 
                        items={userState.data.maquinarias} 
                    />}
                </div>

                <div 
                    className={`dashboard__tab${activeTab === 'service' ? ' active':''}`}
                >
                    <div className="link-container calendar-cont__add">
                        <Link to="/mi-cuenta/agregar-servicio" className="link">
                            <IconPlus />
                            AGREGAR SERVICIO NUEVO
                        </Link>
                    </div>
                    {userState.data && userState.data.servicios && 
                    <Listing
                        type="service" 
                        action="edit" 
                        items={userState.data.servicios} 
                    />}
                </div>

                <div 
                    className={`dashboard__tab${activeTab === 'chat' ? ' active':''}`}
                >
                    {userState.loading ?
                        <Spinner/>:
                        ((userState.data.chats && userState.data.chats.length) ?
                            <div>
                                {userState.data.unread > 0 && 
                                <div className="calendar-cont__add">
                                    {userState.data.unread} mensajes nuevos
                                </div>}
                                <Listing
                                    type="chat"  
                                    items={userState.data.chats}
                                />
                            </div> :
                            <EmptyList text="No tenes chats"/>)
                    }
                </div>
            </section>}
        </Aux>
    );
};

export default Dashboard;