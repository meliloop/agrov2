import React from 'react';

const Bar = ({name,location,description}) => {
    return (
        <div className="user__item__data">
            {name && <div className="user__item__name h3"><strong>{name}</strong></div>}
            {location && <div className="user__item__place h3">{location}</div>}
            {description && <div className="user__item__description h5">{description}</div>}
        </div>
    )
}

export default Bar;