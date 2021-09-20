import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    items: [],
    markers: [],
    city_items: [],
    filterPadreTipo: [],
    filterCabezales: [],
    filterFechaDesde: null,
    filterFechaHasta: null,
    filterDistancia: 100,
    viewType: 'map',
    searchType: 'machine',
    userLocation: null,
    place: null,
    showingPopup: false,
    showingMarkerList: false,
    showingFilters: false,
    selectedMachine: null,
    activeMarker: null
};

const fetchSearchStart  = ( state, action ) => updateObject( state, { loading: true } );
const fetchSearchSuccess= ( state, action ) => updateObject( state, { items: action.items, markers: action.markers, loading: false} );
const fetchSearchFail   = ( state, action ) => updateObject( state, { loading: false } );

const fetchSearchLocationStart  = ( state, action ) => updateObject( state, { loading: true } );
const fetchSearchLocationSuccess= ( state, action ) => updateObject( state, { city_items: action.items, loading: false} );
const fetchSearchLocationFail   = ( state, action ) => updateObject( state, { loading: false } );

const searchModeChanged = ( state, action ) => updateObject( state, { viewType: action.mode, showingPopup: false, activeMarker: null, selectedMachine: null, showingMarkerList: false } );
const searchTypeChanged = ( state, action ) => updateObject( state, { searchType: action.searchType, showingPopup: false, activeMarker: null, selectedMachine: null, showingMarkerList: false } );
const setShowingPopup   = ( state, action ) => updateObject( state, { showingPopup: action.status } );
const setShowingMarkerList=( state, action )=> updateObject( state, { showingMarkerList: action.status } );
const setActiveMarker   = ( state, action ) => updateObject( state, { activeMarker: action.marker } );
const setSelectedMachine= ( state, action ) => updateObject( state, { selectedMachine: action.data } );
const setShowingFilters = ( state, action ) => updateObject( state, { showingFilters: !state.showingFilters });
const userLocationChanged=( state, action ) => updateObject( state, { userLocation: action.position } );
const placeChanged      = ( state, action ) => updateObject( state, { place: action.place } );

const padreFilterChanged= ( state, action ) => {
    let tipos   =   Object.values(state.filterPadreTipo).includes(action.tipo) ?
                        state.filterPadreTipo.filter(elem => elem !== action.tipo) :
                        [...state.filterPadreTipo, action.tipo];
    return updateObject( state, { filterPadreTipo: tipos } );
};

const cabezalesFilterChanged= ( state, action ) => {
    let tipos   =   Object.values(state.filterCabezales).includes(action.tipo) ?
                        state.filterCabezales.filter(elem => elem !== action.tipo) :
                        [...state.filterCabezales, action.tipo];
    return updateObject( state, { filterCabezales: tipos } );
};

const fechaDesdeFilterChanged = ( state, action ) => updateObject( state, { filterFechaDesde: action.fecha });
const fechaHastaFilterChanged = ( state, action ) => updateObject( state, { filterFechaHasta: action.fecha });
const distanciaFilterChanged  = ( state, action ) => updateObject( state, { filterDistancia:  parseInt(action.distancia) });

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SEARCH_START: return fetchSearchStart( state, action );
        case actionTypes.FETCH_SEARCH_SUCCESS: return fetchSearchSuccess( state, action );
        case actionTypes.FETCH_SEARCH_FAIL: return fetchSearchFail( state, action );
        case actionTypes.FETCH_MARKER_LOCATION_START: return fetchSearchLocationStart( state, action );
        case actionTypes.FETCH_MARKER_LOCATION_SUCCESS: return fetchSearchLocationSuccess( state, action );
        case actionTypes.FETCH_MARKER_LOCATION_FAIL: return fetchSearchLocationFail( state, action );
        case actionTypes.CHANGE_SEARCH_MODE: return searchModeChanged( state, action );
        case actionTypes.CHANGE_SEARCH_TYPE: return searchTypeChanged( state, action );
        case actionTypes.USER_LOCATION_DETECTED: return userLocationChanged( state, action );
        case actionTypes.CHANGE_SEARCH_PLACE: return placeChanged( state, action );
        case actionTypes.CHANGE_ACTIVE_MARKER: return setActiveMarker( state, action );
        case actionTypes.CHANGE_SELECTED_MACHINE: return setSelectedMachine( state, action );
        case actionTypes.CHANGE_SEARCH_POPUP: return setShowingPopup( state, action );
        case actionTypes.CHANGE_SEARCH_LIST_OPEN: return setShowingMarkerList( state, action );
        case actionTypes.CHANGE_SEARCH_OPENFILTERS: return setShowingFilters( state, action );
        case actionTypes.CHANGE_SEARCH_PADRETIPOFILTERS: return padreFilterChanged( state, action );
        case actionTypes.CHANGE_SEARCH_TIPOFILTERS: return cabezalesFilterChanged( state, action );
        case actionTypes.CHANGE_SEARCH_DESDEFILTERS: return fechaDesdeFilterChanged( state, action );
        case actionTypes.CHANGE_SEARCH_HASTAFILTERS: return fechaHastaFilterChanged( state, action );
        case actionTypes.CHANGE_SEARCH_DISTANCIAFILTERS: return distanciaFilterChanged( state, action );
        default: return state;
    }
};

export default reducer;