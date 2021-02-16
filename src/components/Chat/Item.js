import React from 'react';
import { Link } from "react-router-dom";

import BackgroundImage from '../UI/Background/Image';
import {IconContact} from '../UI/Icon/Icon';

const Item = (props) => {
    const data = props.data;
        
    return (
        <Link className="messages__item" to={`/mi-cuenta/chat/usuario/${data.contact.id}`}>
            {(data.unread > 0) && 
            <span className="news-message">
                <IconContact />
            </span>}

            <div className="messages__item__image">
                {data.contact.avatar && <BackgroundImage path={data.contact.avatar}/>}
            </div>

            <div className="messages__item__data">
                <div className="messages__item__name h3">
                    <strong>{data.contact.name}</strong>
                </div>
                <div className="messages__item__place h4">
                    {data.contact.lugar}
                </div>
                <div className="messages__item__message h4">
                    {data.message_text}
                </div>
            </div>
            
            {props.children}
        </Link>
    );
};

export default Item;