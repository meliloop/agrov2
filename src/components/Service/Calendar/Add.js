import React, {useState} from 'react';
import { useDispatch } from "react-redux";

import { addCalendarDateService } from '../../../store/actions/index';

import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import SectionTitle from '../../UI/Title/Primary';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const Add = () => {
    const dispatch  = useDispatch();

    const [locationAddress, setLocationAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [selectedDate, setRangeDate] = useState([new Date(), new Date()]);

    const onPlaceSelect = (place) => {
        setLocationAddress(place.label);
        setPlaceId(place.value.place_id);
        geocodeByPlaceId(place.value.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setLocation({ lat, lng });
            });
    };

    const handleAdd = () => {
        let data = {};
        data.placeId  = placeId;
        data.lugar    = { address: locationAddress, lat: location.lat, lng: location.lng };
        data.desde    = selectedDate[0].getDate()+'/'+(selectedDate[0].getMonth()+1)+'/'+selectedDate[0].getFullYear();
        data.hasta    = selectedDate[1].getDate()+'/'+(selectedDate[1].getMonth()+1)+'/'+selectedDate[1].getFullYear();
            
        dispatch(addCalendarDateService(data));
    };

    return (
        <div className="row calendar-cont__disponibility">
            <div className="row">
                <SectionTitle text="AGREGAR FECHA" />
            </div>
            <div className="row">
                <div className="date">
                    <label>Fecha</label>
                    <DateRangePicker
                        onChange={setRangeDate}
                        value={selectedDate}
                        minDate={new Date()}
                        required={true}
                        format={"dd-MM-y"}
                    />
                </div>
            </div>
            <div className="row">
                <div className="place">
                    <GooglePlacesAutocomplete
                        apiOptions={{ language: 'es', region: 'es' }}
                        // eslint-disable-next-line no-undef
                        apiKey={firebase.config().googlemaps.key}
                        selectProps={{location, onChange: onPlaceSelect, loadingMessage: () => { return 'Buscando...'; }, placeholder: 'Ubicación…', noOptionsMessage: () => { return 'Escriba su ubicación...'}}}
                        autocompletionRequest={{types: ['(cities)'], componentRestrictions: {country: ['ar']}}} />
                </div>
            </div>
            <div className="row">
                <div className="buttons-cont">
                    <div
                        className="button button--full btn-outline-primary" 
                        onClick={handleAdd}
                    >
                        <span>Agregar</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;