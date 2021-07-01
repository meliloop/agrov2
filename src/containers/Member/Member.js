import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchMember, setCurrentNavigation } from '../../store/actions/index';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import BackgroundImage from '../../components/UI/Background/Image';
import UserItem from '../../components/User/Item';
import Spinner from '../../components/UI/Spinner/Spinner';
import { IconContact } from '../../components/UI/Icon/Icon';
import SmallTitle from '../../components/UI/Title/Small';
import Listing from '../../components/Listing/Listing';

const Member = (props) => {
    const memberState = useSelector(state => state.member);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setCurrentNavigation('single') );
        dispatch( fetchMember( { id: props.match.params.usuarioId } ) );
    },[dispatch, props.match.params.usuarioId]);

    return (
        <Aux>
            <section className="single-user">
                {(memberState.loading || !memberState.member) ? 
                    <Spinner />:
                    <div>
                        <div className="user__image">
                            {memberState.member.avatar &&
                            <BackgroundImage 
                                path={memberState.member.avatar} 
                                alt={memberState.member.name} 
                            />}
                        </div>
                        
                        <div className="single-user-cont">
                            <div className="container">
                                <div className="single-user__data">
                                    <div className="user__item">
                                        <div className="user__item__data">
                                            <UserItem 
                                                name={memberState.member.name} 
                                                location={memberState.member.lugar} 
                                                description={memberState.member.descripcion}
                                             />
                                        </div>
                                    </div>

                                    <div className="buttons-cont">
                                        <Link 
                                            to={"/mi-cuenta/chat/usuario/"+memberState.member.id} 
                                            className="button contact-btn">
                                            <IconContact />
                                            <span>Contactar</span>
                                        </Link>
                                    </div>
                                </div>
                                    
                                <div className="single-user__machines">
                                    <SmallTitle text="Maquinarias" />
                                    {memberState.member.maquinarias && 
                                        <Listing 
                                            type="machine" 
                                            action="view" 
                                            items={memberState.member.maquinarias} 
                                        />}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Aux>
    );
}

export default Member;