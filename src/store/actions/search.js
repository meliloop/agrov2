import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchSearchSuccess = ( items, markers ) => {
    items.sort((a, b) => (a.distancia > b.distancia) ? 1 : -1)

    return {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        items: items,
        markers: markers,
    };
};

export const fetchSearchFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SEARCH_FAIL,
        error: error
    };
};

export const fetchSearchStart = () => {
    return {
        type: actionTypes.FETCH_SEARCH_START
    };
};

export const fetchMarkerLocationsSuccess = ( items ) => {
    items.sort((a, b) => (a.distancia > b.distancia) ? 1 : -1)

    return {
        type: actionTypes.FETCH_MARKER_LOCATION_SUCCESS,
        items: items,
    };
};

export const fetchMarkerLocationsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_MARKER_LOCATION_FAIL,
        error: error
    };
};

export const fetchMarkerLocationsStart = () => {
    return {
        type: actionTypes.FETCH_MARKER_LOCATION_START
    };
};

export const userLocated = ( position ) => {
    return {
        type: actionTypes.USER_LOCATION_DETECTED,
        position: position
    };
};

export const setPlace = ( place ) => {
    return {
        type: actionTypes.CHANGE_SEARCH_PLACE,
        place: place
    };
};

export const viewModeChanged = ( mode ) => {
    return {
        type: actionTypes.CHANGE_SEARCH_MODE,
        mode: mode
    };
};

export const searchTypeChanged = ( mode ) => {
    return {
        type: actionTypes.CHANGE_SEARCH_TYPE,
        mode: mode
    };
};

export const activeMarkerChanged = ( marker ) => {
    return {
        type: actionTypes.CHANGE_ACTIVE_MARKER,
        marker: marker
    };
};

export const showingPopupChanged = ( status ) => {
    return {
        type: actionTypes.CHANGE_SEARCH_POPUP,
        status: status
    };
};

export const showingMarkerListChanged = ( status ) => {
    return {
        type: actionTypes.CHANGE_SEARCH_LIST_OPEN,
        status: status
    };
};

export const selectedMachineChanged = ( data ) => {
    return {
        type: actionTypes.CHANGE_SELECTED_MACHINE,
        data: data
    };
};

export const toggleShowingFilters = () => {
    return {
        type: actionTypes.CHANGE_SEARCH_OPENFILTERS
    };
};

export const filtersChanged = ( filters ) => {
    switch( filters.key ){
        case 'padreTipo':
            return { type: actionTypes.CHANGE_SEARCH_PADRETIPOFILTERS, tipo: filters.value };
        case 'tipo':
            return { type: actionTypes.CHANGE_SEARCH_TIPOFILTERS, tipo: filters.value };
        case 'fechaDesde':
            return { type: actionTypes.CHANGE_SEARCH_DESDEFILTERS, fecha: filters.value };
        case 'fechaHasta':
            return { type: actionTypes.CHANGE_SEARCH_HASTAFILTERS, fecha: filters.value };
        case 'distancia':
            return { type: actionTypes.CHANGE_SEARCH_DISTANCIAFILTERS, distancia: filters.value };                        
        default:
            return {};
    }
};

export const initSearchLocation = (position) => {
    return dispatch => {
        const filters = {
            ubicacion: position,
            distancia: 1000,
            cabezales: [],
        };
            
        if( position ){
            localStorage.setItem('userLocationLat', position.lat);
            localStorage.setItem('userLocationLng', position.lng);
        }
        
        dispatch(userLocated(position));
        dispatch(fetchSearch(filters));
    };
};

export const fetchSearch = (filters) => {
    return dispatch => {
        dispatch(fetchSearchStart());
        axios.post("/agro/v1/search",filters)
            .then( res => {
                if( res.data.result === 'ok' )
                    dispatch(fetchSearchSuccess(res.data.maquinarias, res.data.markers));
                else 
                    dispatch(fetchSearchFail(res.data.err));
            } )
            .catch( err => {
                dispatch(fetchSearchFail(err));
            } );
    };
};

export const fetchMarkerLocations = (filters) => {
    return dispatch => {
        dispatch(fetchMarkerLocationsStart());
        axios.post("/agro/v1/bylocation", filters)
            .then( res => {
                if( res.data.result === 'ok' )
                    dispatch(fetchMarkerLocationsSuccess(res.data.maquinarias));
                else 
                    dispatch(fetchMarkerLocationsFail(res.data.err));
            } )
            .catch( err => {
                dispatch(fetchMarkerLocationsFail(err));
            } );
    };
};