import React from 'react';

const Distance = (props) => {
    const getDistance = (location) => {
        const lat1 = localStorage.getItem('userLocationLat');
        const lon1 = localStorage.getItem('userLocationLng');

        if( !lat1 || !lon1 )
            return 0;

        const lat2 = location.lat;
        const lon2 = location.lng;
        let theta  = lon1 - lon2;
        let dist   = Math.sin(lat1*0.017453292519943295) * Math.sin(lat2*0.017453292519943295) +  Math.cos(lat1*0.017453292519943295) * Math.cos(lat2*0.017453292519943295) * Math.cos(theta*0.017453292519943295);
        dist   = Math.acos(dist);
        dist   = (dist * 57.29577951308232);
        let miles  = dist * 60 * 1.1515;
        miles = (miles*1.609344);
        return parseInt(miles);
    };

    return (
        <>
            {props.distancia !== undefined &&
            <div className="machine__location">
                <div className="row">
                    <span className="h4">ESTAS A</span>
                    <p className="h3"><strong>{props.distancia} KM</strong></p>
                </div>
            </div>}

            {(props.lugar !== undefined && localStorage.getItem('userLocation')) && 
            <div className="machine__location">
                <div className="row">
                    <span className="h4">ESTAS A</span>
                    <p className="h3">
                        <strong>{getDistance(props.lugar)} KM</strong>
                    </p>
                </div>
            </div>}
        </>
    );
}

export default Distance;