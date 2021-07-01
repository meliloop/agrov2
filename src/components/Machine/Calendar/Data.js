import React from 'react';

import Distance from '../Distance/Distance';

const Data = ({data}) => {
    return (
        <>
            {(data.fechas && data.fechas.length) ?
            <>
                <div className="machine__calendar-data">
                    <p className="h5">Desde {data.fechas[0].desde} Hasta {data.fechas[0].hasta}</p>
                </div>
                <Distance lugar={data.fechas[0].lugar} />
            </>
            :''}
        </>
    );
}

export default Data;