import React from 'react';

import Collapse from '@material-ui/core/Collapse';
import Child from './Child';
import { IconPlus, IconMinus } from '../../UI/Icon/Icon';

const Item = (props) => {
    const {id, title, childs} = props.data;
    let isOpen  =   false;

    if( props.parentSelected ){
        if( typeof(props.parentSelected) === 'number' )
            isOpen = ( props.parentSelected === id ) ? true:false;

        if( typeof(props.parentSelected) === 'object' )
            isOpen = Object.values(props.parentSelected).includes(id);
    }
        
    const handleSetOpen = () => {
        props.parentClick(id);
    };

    return (
        <div>
            <div className="machines__list__item">
                <div onClick={handleSetOpen} >
                    <span className={isOpen ? 'check checked':'check'}></span>
                    <span className="name">{title}</span>
                </div>

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
        </div>
    )
}

export default Item;