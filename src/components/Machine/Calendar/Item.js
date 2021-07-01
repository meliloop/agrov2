import React from 'react';

import { IconMinus } from '../../UI/Icon/Icon';

const Item = (props) => {
    const {id, place, from, to} = props.data;

    const handleClick = () => {
        if( props.handleDelete !== null )
            props.handleDelete(id);
    };

    return (
        <div 
            className="calendar-cont__list__item"
            onClick={props.handleDelete && handleClick}
          >
            <div className="place">{place}</div>
            <div className="date">Desde <span>{from}</span> hasta <span>{to}</span></div>
            {props.action === 'edit' && <IconMinus />}
        </div>
    );
};

export default Item;