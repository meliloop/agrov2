import React from 'react';

const Distance = ({data}) => {
    return (
        <div className="machine__location">
            <div className="row">
                <span className="h4">ESTAS A</span>
                <p className="h3"><strong>{data}</strong></p>
            </div>
        </div>
    );
}

export default Distance;