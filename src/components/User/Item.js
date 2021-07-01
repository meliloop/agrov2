import React from 'react';

const Item = (props) => {
    const {name,location,description} = props;
    
    return (
        <div>
            <div className="user__item__data">
                {name && <div className="user__item__name h3"><strong>{name}</strong></div>}
                {location && <div className="user__item__place h3">{location}</div>}
                {description && <div className="user__item__description h5">{description}</div>}
            </div>
            
            {props.children}
        </div>
    )
}

export default Item;