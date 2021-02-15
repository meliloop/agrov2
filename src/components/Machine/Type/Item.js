import React from 'react';

import Collapse from '@material-ui/core/Collapse';
import Child from './Child';
import { IconPlus, IconMinus } from '../../UI/Icon/Icon';

const Item = (props) => {
    const {id, title, childs} = props.data;
    const isOpen =  ( typeof(props.parentSelected) === 'object' ) ?
                        Object.values(props.parentSelected).includes(id):
                        ((props.parentSelected === id ) ? true:false);
        
    const handleSetOpen = () => {
        props.parentClick(id);
    };

    return (
        <>
            <div className="machines__list__item no-check">
                <span className="name">{title}</span>
                {childs.length > 0 &&
                <div className="open-submenu" onClick={handleSetOpen}>
                    <span className={isOpen ? "minus":"plus"}>
                    {isOpen ? 
                        <IconMinus/>
                        :
                        <IconPlus />}
                    </span>
                </div>}
            </div>
            <Collapse in={isOpen}>
                <div className="machine__sublist">
                    {childs.map(cabezal =>  <Child 
                                                key={cabezal.id} 
                                                data={cabezal} 
                                                childsSelected={props.childsSelected} 
                                                childClick={props.childClick} 
                                            />)}
                </div>
            </Collapse>
        </>
    )
}

export default Item;