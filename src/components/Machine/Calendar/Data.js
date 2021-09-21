import React from 'react';

const Data = ({data}) => {
    return (
        <>
            {(data.fechas && data.fechas.length) ?
                <div className="machine__calendar-data">
                    <p className="h5">Desde {data.fechas[0].desde} Hasta {data.fechas[0].hasta}</p>
                </div>
                :
                <div className="machine__calendar-data"></div>}
        </>
    );
}

export default Data;