import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
   loading: true,
   member: null,
   machine: null,
   selectedTipoPadre: null,
   selectedTipos: [],
   tipos:[],
   caracteristicas:[],
   formData: null,
   error: null,
   success: null,
   isDeleted: false,
};

const fetchMachineStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const fetchMachineFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const fetchMachineSuccess = ( state, action ) => {
    return updateObject( state, {
        machine: action.machine,
        member: action.machine.usuario,
        loading: false, 
        isDeleted: false
    } );
};

const fetchMachineTypeStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const fetchMachineTypeFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const fetchMachineTypeSuccess = ( state, action ) => {
    return updateObject( state, {
        tipos: action.data,
        loading: false, 
        isDeleted: false
    } );
};

const setTipoPadre    = ( state, action ) => {
    return updateObject( state, { selectedTipoPadre: action.tipo, selectedTipos:[], error: null, success: null, isDeleted: false } );
};

const setTipos        = ( state, action ) => {
    let tipos   =   Object.values(state.selectedTipos).includes(action.tipo) ?
                        state.selectedTipos.filter(elem => elem !== action.tipo) :
                        [...state.selectedTipos, action.tipo];
    return updateObject( state, { selectedTipos: tipos, error: null, success: null, isDeleted: false } );
};

const addCaracteristica    = ( state, action ) => {
    let caracteristicas = !Object.values(state.caracteristicas).includes(action.caracteristica) && 
                 [...state.caracteristicas, action.caracteristica];
    return updateObject( state, { caracteristicas: caracteristicas} );
};

const removeCaracteristica    = ( state, action ) => {
    let caracteristicas = state.caracteristicas.filter((elem,index) => index !== action.key);
    return updateObject( state, { caracteristicas: caracteristicas} );
};

const setCaracteristicas   = ( state, action ) => updateObject( state, { caracteristicas: action.caracteristicas} );

const createMachineStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const createMachineFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const createMachineSuccess = ( state, action ) => {
    return updateObject( state, {
        machine: action.machine,
        loading: false,
        error: null,
        success: 'Su maquinaria fue creada correctamente', 
        isDeleted: false
    } );
};

const updateMachineStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const updateMachineFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const updateMachineSuccess = ( state, action ) => {
    return updateObject( state, {
        machine: action.machine,
        loading: false,
        error: null,
        success: 'Su maquinaria fue actualizada correctamente', 
        isDeleted: false
    } );
};

const deleteMachineStart   = ( state, action ) => updateObject( state, { loading: true, error: null, success: null, isDeleted: false } );
const deleteMachineFail    = ( state, action ) => updateObject( state, { loading: false, error: action.error, success: null, isDeleted: false } );
const deleteMachineSuccess = ( state, action ) => {
    return updateObject( state, {
        isDeleted: true,
        loading: false,
        error: null,
        success: 'Su maquinaria fue eliminada correctamente'
    } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_MACHINE_START:
            return fetchMachineStart(state, action);
        case actionTypes.FETCH_MACHINE_SUCCESS:
            return fetchMachineSuccess(state, action);
        case actionTypes.FETCH_MACHINE_FAIL:
            return fetchMachineFail(state, action);
        case actionTypes.FETCH_MACHINETYPES_START:
            return fetchMachineTypeStart(state, action);
        case actionTypes.FETCH_MACHINETYPES_SUCCESS:
            return fetchMachineTypeSuccess(state, action);
        case actionTypes.FETCH_MACHINETYPES_FAIL:
            return fetchMachineTypeFail(state, action);     
        case actionTypes.MAINTYPE_CHANGED:  
            return setTipoPadre(state, action);
        case actionTypes.OTHERTYPES_CHANGED: 
            return setTipos(state, action); 
        case actionTypes.CREATE_MACHINE_START:
            return createMachineStart(state, action);
        case actionTypes.CREATE_MACHINE_SUCCESS:
            return createMachineSuccess(state, action);
        case actionTypes.CREATE_MACHINE_FAIL:
            return createMachineFail(state, action);
        case actionTypes.UPDATE_MACHINE_START:
            return updateMachineStart(state, action);
        case actionTypes.UPDATE_MACHINE_SUCCESS:
            return updateMachineSuccess(state, action);
        case actionTypes.UPDATE_MACHINE_FAIL:
            return updateMachineFail(state, action);
        case actionTypes.DELETE_MACHINE_START:
            return deleteMachineStart(state, action);
        case actionTypes.DELETE_MACHINE_SUCCESS:
            return deleteMachineSuccess(state, action);
        case actionTypes.DELETE_MACHINE_FAIL:
            return deleteMachineFail(state, action);
        case actionTypes.MACHINE_SET_CARACTERISTICAS:
            return setCaracteristicas(state, action);
        case actionTypes.MACHINE_ADD_CARACTERISTICA:
            return addCaracteristica(state, action);
        case actionTypes.MACHINE_REMOVE_CARACTERISTICA:
            return removeCaracteristica(state, action);
        default: 
            return state;
    }
};

export default reducer;