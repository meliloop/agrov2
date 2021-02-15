import React from 'react';

import { IconMinus } from '../../UI/Icon/Icon';

const Item = (props) => {
    const {id, descripcion} = props.data;

    const handleClick = () => {
        if( props.handleDelete !== null )
            props.handleDelete(id);
    };

    return (
        <div 
            className="single-machine__features__item"
            onClick={handleClick}
          >
            {descripcion} 
            {props.action === 'edit' && <IconMinus />}
        </div>
    );
};

export default Item;