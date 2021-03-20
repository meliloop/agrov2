import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Switch from '@material-ui/core/Switch';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import { config } from '../../components/Map/Config';
import Map from '../../components/Map/Map';
import { setCurrentNavigation, fetchSearch, userLocated, setPlace, initSearchLocation } from '../../store/actions/index';
import { viewModeChanged, activeMarkerChanged, showingPopupChanged, toggleShowingFilters } from '../../store/actions/index';
import { fetchMachineTypes, filtersChanged, showingMarkerListChanged, selectedMachineChanged, fetchMarkerLocations } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Empty from '../../components/Listing/Empty';
import Popup from '../../components/Machine/Popup/Popup';
import Filters from '../../components/Machine/Search/Filters';
import SmallTitle from '../../components/UI/Title/Small';
import Machine from '../../components/Machine/Item';
import Distance from '../../components/Machine/Distance/Distance';
import NewMessages from '../../components/Chat/Unread';
import { IconSearch } from '../../components/UI/Icon/Icon';

const Search = () => {
    const [orderType, setOrderType] = useState('distancia');
    const [orderCityType, setOrderCityType] = useState('distancia');
    const searchState   = useSelector(state => state.search);
    const formState     = useSelector(state => state.machine);
    const dispatch      = useDispatch();

    const handleModeChange       = (e)  => dispatch( viewModeChanged(e.target.checked ? 'map':'list') );
    const handleMapClick         = ()   => dispatch( showingPopupChanged(false) );
    const handleToggleFilters    = ()   => dispatch( toggleShowingFilters() );
    const handleTipoSelected     = (id) => dispatch( filtersChanged({key: 'tipo', value: id}) );
    const handleFechaDesdeChange = (e)  => dispatch( filtersChanged({key: 'fechaDesde', value: e.target.value}) );
    const handleFechaHastaChange = (e)  => dispatch( filtersChanged({key: 'fechaHasta', value: e.target.value}) );
    const handleDistanceChange   = (e)  => dispatch( filtersChanged({key: 'distancia',  value: e.target.value}) );
    const handleSelectPlace = (position, place)=> {
        dispatch( userLocated(position) );
        dispatch( setPlace(place) );
    }

    const handlePadreSelected    = (id) => {
        id = ( formState.selectedTipoPadre === id ) ? null:id;
        dispatch( filtersChanged({key: 'padreTipo', value: id}) );
    };

    const compareValues = (key, order = 'asc') => {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
                return 0;

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }

            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    };

    const handleMarkerClick = (props, marker, e) => {
        dispatch( activeMarkerChanged(marker) );
        dispatch( showingMarkerListChanged(true) );
        dispatch( fetchMarkerLocations(marker.data.tipo_maquinaria.id, marker.data.place_id) );
    };

    const handleOpenPopupMachine = (data) => {
        dispatch( selectedMachineChanged(data) );
        dispatch( showingPopupChanged(true) );
    };

    const handleOrderChange = (e) => {
        setOrderType(e.target.value);
        searchState.items.sort(compareValues(e.target.value, 'asc'));
    };

    const handleCityOrderChange = (e) => {
        setOrderCityType(e.target.value);
        searchState.city_items.sort(compareValues(e.target.value, 'asc'));
    };

    const handleFiltersSubmit = (event) => {
        event.preventDefault();

        const filters = {
            ubicacion: searchState.userLocation,
            cabezales: searchState.filterCabezales,
            distancia: searchState.filterDistancia,
            fecha_desde: searchState.filterFechaDesde,
            fecha_hasta: searchState.filterFechaHasta
        };

        dispatch( toggleShowingFilters() );
        dispatch( fetchSearch(filters) );
    };

    const getZoom = (distance) => {
        let zoom = Math.log(2)/Math.log(40000 / (distance / 2));
        return zoom ? parseInt(zoom*100):10;
    };

    useEffect( () => {
        dispatch( setCurrentNavigation('search') );

        navigator.geolocation.getCurrentPosition(position => {
            const currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            dispatch( initSearchLocation(currentPosition) );
        },error => {
            dispatch( initSearchLocation(config.default_center) );
        });

        dispatch( fetchMachineTypes() );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Aux>
            {searchState.loading ?
                <Spinner />:
                <div className="search--results">
                    <div className="buttons--container">
                        {formState.tipos &&
                        <div className="openFilters" onClick={handleToggleFilters}>
                            <IconSearch />
                        </div>}
                        <div className="mesasge__btn_header">
                          <NewMessages />
                        </div>
                    </div>

                    {searchState.showingFilters &&
                        <Filters
                          items={formState.tipos}
                          handleTipoSelected={handleTipoSelected}
                          handlePadreSelected={handlePadreSelected}
                          parentSelected={searchState.filterPadreTipo}
                          childsSelected={searchState.filterCabezales}
                          handleFiltersClose={handleToggleFilters}
                          handleSubmit={handleFiltersSubmit}
                          handleSelectPlace={handleSelectPlace}
                          handleFechaDesdeChange={handleFechaDesdeChange}
                          handleFechaHastaChange={handleFechaHastaChange}
                          handleDistanceChange={handleDistanceChange}
                          distance={searchState.distance}
                          place={searchState.place}
                        />}

                    <div className="switch--container">
                        <Switch
                            checked={searchState.viewType === 'map'}
                            onChange={handleModeChange}
                            name="view_type"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>

                    <div className="results--container">
                        <div className={`map--container ${searchState.viewType !== 'map' && 'hidden'}`}>
                            <Map
                                zoom={getZoom(searchState.filterDistancia)}
                                markers={searchState.markers}
                                userLocation={searchState.userLocation}
                                markerClick={handleMarkerClick}
                                mapClick={handleMapClick}
                                activeMarker={searchState.activeMarker}
                                />
                            {searchState.showingPopup && <Popup data={searchState.selectedMachine} />}
                        </div>
                        <div className={`list--container ${searchState.viewType === 'map' && 'hidden'}`}>
                            <div className="order-container">
                                <SmallTitle text="ORDENAR POR" />
                                <div className="orderby--container">
                                    <select className="distance-dropdown" value={orderType} onChange={handleOrderChange}>
                                        <option key="0" value="distancia">DISTANCIA</option>
                                        <option key="1" value="modelo">MODELO</option>
                                        <option key="2" value="year">AÑO</option>
                                    </select>
                                </div>
                            </div>
                            {searchState.items ?
                                searchState.items.map(item => ( <Link key={item.id} to={"/maquina/id/"+item.id}>
                                                                    <Machine data={item}>
                                                                        <Distance data={item.distancia} />
                                                                    </Machine>
                                                                </Link>)):
                                <Empty />}
                        </div>
                        
                        {searchState.showingMarkerList &&
                        <div className={`list--container list--container-city`}>
                            <div className="order-container">
                                <SmallTitle text="ORDENAR POR" />
                                <div className="orderby--container">
                                    <select className="distance-dropdown" value={orderCityType} onChange={handleCityOrderChange}>
                                        <option key="0" value="distancia">DISTANCIA</option>
                                        <option key="1" value="modelo">MODELO</option>
                                        <option key="2" value="year">AÑO</option>
                                    </select>
                                </div>
                            </div>
                            {searchState.city_items ?
                                searchState.city_items.map(item => ( <div key={item.id} onClick={() => handleOpenPopupMachine(item)}>
                                                                        <Machine data={item}>
                                                                            <Distance data={item.distancia} />
                                                                        </Machine>
                                                                    </div>)):
                                <Empty />}
                        </div>}
                    </div>
                </div>
            }
        </Aux>
    );
};

export default Search;
