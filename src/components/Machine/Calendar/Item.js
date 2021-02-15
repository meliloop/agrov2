import React from 'react';

const Data = ({data}) => {
    return (
        <div className="calendar-cont__list__item">
            <div className="place">Tres Algarrobos</div>
            <div className="date">Desde <span>01/10/2020</span> hasta <span>05/10/2020</span></div>
            <div className="head">Con cabezal 1 para maiz</div>
        </div>
    );
}

export default Data;