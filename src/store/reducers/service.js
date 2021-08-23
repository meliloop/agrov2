import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: true,
    member: null,
    service: {
        id: null,
        modelo: null,
        year: null,
        imagen: null,
        ubicacion: null,
        estado: null
    },
    selectedTipoPadre: null,
    selectedTipos: [],
    tipos:[],
    caracteristicas:[],
    fechas:[],
    formData: null,
    error: null,
    success: null,
    isDeleted: false,
};

const fetchServiceStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const fetchServiceFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const fetchServiceSuccess = ( state, action ) => {
    return updateObject( state, {
        service: action.service,
        member: action.service.usuario,
        loading: false, 
        isDeleted: false
    } );
};
const fetchServiceClear = ( state, action ) =>  updateObject( state, { loading: true, service: { id: null, modelo: null, year: null, imagen: null, ubication: null, estado: null }, selectedTipoPadre: null, selectedTipos: [], tipos:[], caracteristicas:[], formData: null, error: null, success: null, isDeleted: false, } );

const fetchServiceTypeStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const fetchServiceTypeFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const fetchServiceTypeSuccess = ( state, action ) => {
    return updateObject( state, {
        tipos: action.data,
        loading: false, 
        isDeleted: false
    } );
};

const setTipoPadreService    = ( state, action ) => {
    return updateObject( state, { selectedTipoPadre: action.tipo, selectedTipos:[], error: null, success: null, isDeleted: false } );
};

const setTiposService = ( state, action ) => {
    let tipos   =   Object.values(state.selectedTipos).includes(action.tipo) ?
                        state.selectedTipos.filter(elem => elem !== action.tipo) :
                        [...state.selectedTipos, action.tipo];
    return updateObject( state, { selectedTipos: tipos, error: null, success: null, isDeleted: false } );
};

const addCaracteristicaService    = ( state, action ) => {
    let caracteristicas = !Object.values(state.caracteristicas).includes(action.caracteristica) && 
                 [...state.caracteristicas, action.caracteristica];
    return updateObject( state, { caracteristicas: caracteristicas} );
};

const removeCaracteristicaService    = ( state, action ) => {
    let caracteristicas = state.caracteristicas.filter((elem,index) => index !== action.key);
    return updateObject( state, { caracteristicas: caracteristicas} );
};

const setCaracteristicasService = ( state, action ) => updateObject( state, { caracteristicas: action.caracteristicas} );

const addCalendarDateService = ( state, action ) => {
    let fechas = !Object.values(state.fechas).includes(action.fecha) && 
                 [...state.fechas, action.fecha];
    return updateObject( state, { fechas: fechas} );
};

const removeCalendarDateService= ( state, action ) => {
    let fechas = state.fechas.filter((elem,index) => index !== action.key);
    return updateObject( state, { fechas: fechas} );
};

const setCalendarDatesService = ( state, action ) => updateObject( state, { fechas: action.fechas} );

const createServiceStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const createServiceFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const createServiceSuccess = ( state, action ) => {
    return updateObject( state, {
        service: action.service,
        loading: false,
        error: null,
        success: 'Su servicio fue creada correctamente', 
        isDeleted: false
    } );
};

const updateServiceStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const updateServiceFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const updateServiceSuccess = ( state, action ) => {
    return updateObject( state, {
        service: action.service,
        loading: false,
        error: null,
        success: 'Su servicio fue actualizada correctamente', 
        isDeleted: false
    } );
};

const deleteServiceStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const deleteServiceFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const deleteServiceSuccess = ( state, action ) => {
    return updateObject( state, {
        isDeleted: true,
        loading: false,
        error: null,
        success: 'Su servicio fue eliminada correctamente'
    } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SERVICE_CLEAR:
            return fetchServiceClear(state, action);
        case actionTypes.FETCH_SERVICE_START:
            return fetchServiceStart(state, action);
        case actionTypes.FETCH_SERVICE_SUCCESS:
            return fetchServiceSuccess(state, action);
        case actionTypes.FETCH_SERVICE_FAIL:
            return fetchServiceFail(state, action);
        case actionTypes.FETCH_SERVICETYPES_START:
            return fetchServiceTypeStart(state, action);
        case actionTypes.FETCH_SERVICETYPES_SUCCESS:
            return fetchServiceTypeSuccess(state, action);
        case actionTypes.FETCH_SERVICETYPES_FAIL:
            return fetchServiceTypeFail(state, action);     
        case actionTypes.SERVICE_MAINTYPE_CHANGED:  
            return setTipoPadreService(state, action);
        case actionTypes.SERVICE_OTHERTYPES_CHANGED: 
            return setTiposService(state, action); 
        case actionTypes.CREATE_SERVICE_START:
            return createServiceStart(state, action);
        case actionTypes.CREATE_SERVICE_SUCCESS:
            return createServiceSuccess(state, action);
        case actionTypes.CREATE_SERVICE_FAIL:
            return createServiceFail(state, action);
        case actionTypes.UPDATE_SERVICE_START:
            return updateServiceStart(state, action);
        case actionTypes.UPDATE_SERVICE_SUCCESS:
            return updateServiceSuccess(state, action);
        case actionTypes.UPDATE_SERVICE_FAIL:
            return updateServiceFail(state, action);
        case actionTypes.DELETE_SERVICE_START:
            return deleteServiceStart(state, action);
        case actionTypes.DELETE_SERVICE_SUCCESS:
            return deleteServiceSuccess(state, action);
        case actionTypes.DELETE_SERVICE_FAIL:
            return deleteServiceFail(state, action);
        case actionTypes.SERVICE_SET_CARACTERISTICAS:
            return setCaracteristicasService(state, action);
        case actionTypes.SERVICE_ADD_CARACTERISTICA:
            return addCaracteristicaService(state, action);
        case actionTypes.SERVICE_REMOVE_CARACTERISTICA:
            return removeCaracteristicaService(state, action);
        case actionTypes.SERVICE_SET_CALENDARDATES:
            return setCalendarDatesService(state, action);
        case actionTypes.SERVICE_ADD_CALENDARDATE:
            return addCalendarDateService(state, action);
        case actionTypes.SERVICE_REMOVE_CALENDARDATE:
            return removeCalendarDateService(state, action);
        default: 
            return state;
    }
};

export default reducer;