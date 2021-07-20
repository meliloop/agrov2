import React from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

import Listing from '../../Listing/Listing';
import SectionTitle from '../../UI/Title/Primary';
import SmallTitle from '../../UI/Title/Small';
import { IconBackArrow } from '../../UI/Icon/Icon';

const Filters = (props) => {
    const place = props.place;
    const onPlaceSelect = (place) => {
        geocodeByPlaceId(place.value.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>
                props.handleSelectPlace({ lat, lng }, place)
            );
    };

    return (
        <form onSubmit={props.handleSubmit} noValidate autoComplete="off">
            <section className="search-cont">
                <section className="header header--boxes">
                    <div className="container">
                        <div className="back_arrow" onClick={props.handleFiltersClose}>
                            <IconBackArrow />
                        </div>

                        <button type="submit" className="button button--small">
                            Buscar
                        </button>
                    </div>
                </section>

                <div className="container">
                    <SectionTitle text="Busqueda" />
                    <div className="small-title--center">
                    <SmallTitle text="Tipo de Maquinaria" />
                    </div>
                </div>

                <div className="machines__list">
                    {props.items &&
                    <Listing
                        type="machine-type"
                        items={props.items}
                        parentSelected={props.parentSelected}
                        childsSelected={props.childsSelected}
                        parentClick={props.handlePadreSelected}
                        childClick={props.handleTipoSelected} />
                    }
                </div>
                    
                <div className="search-cont__disponibility" style={{height: '270px'}}>
                    <div className="date">
                        <label>Fecha</label>
                        <input type="date" min={new Date()} placeholder="Desde" onChange={props.handleFechaDesdeChange} />
                        <input type="date" min={new Date()} placeholder="Hasta" onChange={props.handleFechaHastaChange} />
                    </div>
                    <div className="distance">
                        <label>Dist.</label>
                        <select className="distance-dropdown" value={props.distance} onChange={props.handleDistanceChange}>
                            <option key="0" value="100">100km</option>
                            <option key="1" value="200">200km</option>
                            <option key="2" value="500">500km</option>
                            <option key="3" value="800">800km</option>
                        </select>
                    </div>
                    <div className="distance">
                        <GooglePlacesAutocomplete
                            apiOptions={{ language: 'es', region: 'es' }}
                            selectProps={{place, onChange: onPlaceSelect, loadingMessage: () => { return 'Buscando...'; }, placeholder: 'Ubicación…', noOptionsMessage: () => { return 'Escriba su ubicación...'}}}
                            autocompletionRequest={{types: ['(cities)'], componentRestrictions: {country: ['ar']}}} />
                    </div>
                </div>
            </section>
        </form>
    );
};

export default Filters;
