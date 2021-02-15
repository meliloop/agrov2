import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Switch from '@material-ui/core/Switch';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import { config } from '../../components/Map/Config';
import Map from '../../components/Map/Map';
import { setCurrentNavigation, fetchSearch, userLocated, setPlace, initSearchLocation } from '../../store/actions/index';
import { viewModeChanged, activeMarkerChanged, showingPopupChanged, toggleShowingFilters, filtersChanged } from '../../store/actions/index';
import { fetchMachineTypes } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Listing from '../../components/Listing/Listing';
import Popup from '../../components/Machine/Popup/Popup';
import Filters from '../../components/Machine/Search/Filters';
import { IconSearch } from '../../components/UI/Icon/Icon';

const Search = (props) => {
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

    const handleMarkerClick = (props, marker, e) => {
        dispatch( activeMarkerChanged(marker) );
        dispatch( showingPopupChanged(true) );
    };

    const handleFiltersSubmit = () => {
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
            console.log(currentPosition);
            dispatch( initSearchLocation(currentPosition) );
        },error => {
            dispatch( initSearchLocation(config.default_center) );
        });

        dispatch( fetchMachineTypes() );
    }, []);

    return (
        <Aux>
            {searchState.loading ?
                <Spinner />:
                <div className="search--results">
                    {searchState.showingFilters && 
                        <Filters 
                          items={formState.tipos}
                          handleTipoSelected={handleTipoSelected}
                          handlePadreSelected={handlePadreSelected}
                          parentSelected={searchState.filterPadreTipo}
                          childsSelected={searchState.filterCabezales}
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
                        {formState.tipos &&
                        <div className="openFilters" onClick={handleToggleFilters}>
                            <IconSearch />
                        </div>}
                    </div>

                    <div className="results--container">
                        <div className={`map--container ${searchState.viewType !== 'map' && 'hidden'}`}>
                            <Map 
                                zoom={getZoom(searchState.filterDistancia)}
                                markers={searchState.items}
                                userLocation={searchState.userLocation}
                                markerClick={handleMarkerClick} 
                                mapClick={handleMapClick}
                                />
                            {searchState.showingPopup && <Popup data={searchState.activeMarker.data} />}
                        </div>
                        <div className={`list--container ${searchState.viewType === 'map' && 'hidden'}`}>
                            <Listing type="machine" items={searchState.items} />
                        </div>
                    </div>
                </div>
            }
        </Aux>
    );
};

export default Search;

/*
class Search extends Component {
    constructor (props) {
        super(props);

        this.handleModeChange   =   this.handleModeChange.bind(this);
        this.handleMapClick     =   this.handleMapClick.bind(this);
        this.handleMarkerClick  =   this.handleMarkerClick.bind(this);
    }

    componentDidMount () {
        this.props.onSetCurrentNavigation('search');
        this.props.onFetchMachines(this.props.filters);

        navigator.geolocation.getCurrentPosition(position => {
            const currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            this.props.onUserPositionDetected(currentPosition);
        });
    }

    handleModeChange (event) {
        let mode    =   event.target.checked ? 'map':'list';
        this.props.onModeChange(mode);
    } 

    handleMapClick(){
        this.props.onPopupChange(false);
        console.log('map click')
    }
    
    handleMarkerClick(props, marker, e) {
        this.props.onActiveMarkerChange(marker);
        this.props.onPopupChange(true);
        marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
    }

    render () {
        return (
            <Aux>
                {this.props.loading ?
                    <Spinner />:
                    <div className="search--results">
                        <div className="switch--container">
                            <Switch
                                checked={this.props.viewType === 'map'}
                                onChange={this.handleModeChange}
                                name="view_type"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>

                        <div className="results--container">
                            <div className={`map--container ${this.props.viewType !== 'map' && 'hidden'}`}>
                                <Map 
                                  markers={this.props.items}
                                  userLocation={this.props.userLocation}
                                  markerClick={this.handleMarkerClick} 
                                  mapClick={this.handleMapClick}
                                  />
                            </div>
                            <div className={`list--container ${this.props.viewType === 'map' && 'hidden'}`}>
                                <Listing type="machine" items={this.props.items} />
                            </div>
                        </div>

                        {this.props.showingPopup && <Popup data={this.props.activeMarker.data} />}
                    </div>
                }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.search.items,
        loading: state.search.loading,
        filters: state.search.filters,
        userLocation: state.search.userLocation,
        viewType: state.search.viewType,
        showingPopup: state.search.showingPopup,
        activeMarker: state.search.activeMarker
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCurrentNavigation: () => dispatch( actions.setCurrentNavigation('search') ),
        onFetchMachines: (filters) => dispatch( actions.fetchSearch(filters) ),
        onUserPositionDetected: (position) => dispatch( actions.userLocated(position) ),
        onModeChange: (mode) => dispatch( actions.viewModeChanged(mode) ),
        onPopupChange: (status) => dispatch( actions.showingPopupChanged(status) ),
        onActiveMarkerChange: (data) => dispatch( actions.activeMarkerChanged(data) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Search, axios ) );*/