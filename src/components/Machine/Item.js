import React from 'react';
import BackgroundImage from '../UI/Background/Image';

const Item = (props) => {
    const {tipo_maquinaria,modelo} = props.data;
        
    return (
        <div className="row" onClick={props.clicked}>
            <div className="machine__item">
                <div className="machine__icon">
                    <BackgroundImage path={tipo_maquinaria.icono} alt={tipo_maquinaria.title} />
                </div>
                <div className="machine__item__data">
                    <div className="machine__item__name h3">{tipo_maquinaria.title}</div>
                    <div className="machine__item__model h3"><strong>{modelo}</strong></div>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default Item;