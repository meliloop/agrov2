import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchMachineStart = () => {
   return {
      type: actionTypes.FETCH_MACHINE_START
   };
};
 
export const fetchMachineSuccess = (data) => {
   return {
      type: actionTypes.FETCH_MACHINE_SUCCESS,
      machine: data
   };
};

export const fetchMachineFail = (error) => {
   return {
      type: actionTypes.FETCH_MACHINE_FAIL,
      error: error
   };
};

export const clearFetchMachine = () => {
   return {
      type: actionTypes.FETCH_MACHINE_CLEAR
   };
};

export const fetchMachine = (data) => {
   return dispatch => {
      dispatch(fetchMachineStart());
         
      axios.post("/agro/v1/maquinaria/", data)
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(fetchMachineSuccess(res.data.maquinaria));
                  
               res.data.maquinaria.caracteristicas && dispatch( setCaracteristicas(res.data.maquinaria.caracteristicas) );
                  
               res.data.maquinaria.fechas.sort((a, b) => (a.order > b.order) ? 1 : -1)
               res.data.maquinaria.fechas && dispatch( setCalendarDates(res.data.maquinaria.fechas) );
               res.data.maquinaria.tipo_maquinaria && dispatch( setTipoPadre(res.data.maquinaria.tipo_maquinaria.id) );
               res.data.maquinaria.cabezales && res.data.maquinaria.cabezales.map(item => dispatch( setTipos(item.id) ) );
            }else{
               dispatch(fetchMachineFail({message: res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(fetchMachineFail({message: err}));
         });
   };
};

export const fetchMachineTypeStart = () => {
   return {
      type: actionTypes.FETCH_MACHINETYPES_START
   };
};

export const fetchMachineTypeSuccess = (data) => {
   return {
      type: actionTypes.FETCH_MACHINETYPES_SUCCESS,
      data: data
   };
};

export const fetchMachineTypeFail = (error) => {
   return {
      type: actionTypes.FETCH_MACHINETYPES_FAIL,
      error: error
   };
};

export const fetchMachineTypes = () => {
   return dispatch => {
      dispatch(fetchMachineTypeStart());
        
      axios.post("/agro/v1/tipos-maquinaria")
         .then((res) => {
            if( res.data.result === 'ok' )
               dispatch(fetchMachineTypeSuccess(res.data.tipos));
            else 
               dispatch(fetchMachineTypeFail(res.data.err));
         })
         .catch((err) => {
            dispatch(fetchMachineTypeFail(err));
         });
   };
};

export const setTipoPadre = ( tipo ) => {
   return {
      type: actionTypes.MAINTYPE_CHANGED,
      tipo: tipo
   };
};

export const setTipos = ( tipo ) => {
   return {
      type: actionTypes.OTHERTYPES_CHANGED,
      tipo: tipo
   };
};

export const setCaracteristicas = ( caracteristicas ) => {
   return {
      type: actionTypes.MACHINE_SET_CARACTERISTICAS,
      caracteristicas: caracteristicas
   };
};

export const addCaracteristica = ( caracteristica ) => {
   return {
      type: actionTypes.MACHINE_ADD_CARACTERISTICA,
      caracteristica: caracteristica
   };
};

export const removeCaracteristica = ( key ) => {
   return {
      type: actionTypes.MACHINE_REMOVE_CARACTERISTICA,
      key: key
   };
};

export const setCalendarDates = ( fechas ) => {
   return {
      type: actionTypes.MACHINE_SET_CALENDARDATES,
      fechas: fechas
   };
};

export const addCalendarDate = ( fecha ) => {
   return {
      type: actionTypes.MACHINE_ADD_CALENDARDATE,
      fecha: fecha
   };
};

export const removeCalendarDate = ( key ) => {
   return {
      type: actionTypes.MACHINE_REMOVE_CALENDARDATE,
      key: key
   };
};

export const createMachineStart = () => {
   return {
      type: actionTypes.CREATE_MACHINE_START
   };
};

export const createMachineSuccess = (data) => {
   return {
      type: actionTypes.CREATE_MACHINE_SUCCESS,
      data: data
   };
};

export const createMachineFail = (error) => {
   return {
      type: actionTypes.CREATE_MACHINE_FAIL,
      error: error
   };
};

export const updateMachineStart = () => {
   return {
      type: actionTypes.UPDATE_MACHINE_START
   };
};

export const updateMachineSuccess = (data) => {
   return {
      type: actionTypes.UPDATE_MACHINE_SUCCESS,
      data: data
   };
};

export const updateMachineFail = (error) => {
   return {
      type: actionTypes.UPDATE_MACHINE_FAIL,
      error: error
   };
};

export const createMachine = (token, data) => {
   return dispatch => {
      dispatch(createMachineStart());
         
      axios.post("/simple-jwt-authentication/v1/crear-maquinaria", data, { headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(createMachineSuccess(res.data.maquinaria));
            }else{
               dispatch(createMachineFail({message:  res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(createMachineFail({message: err}));
         });
   };
};

export const updateMachine = (token, data) => {
   return dispatch => {
      dispatch(updateMachineStart());
         
      axios.post("/simple-jwt-authentication/v1/editar-maquinaria", data, { headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(updateMachineSuccess(res.data.maquinaria));
            }else{
               dispatch(updateMachineFail({message:  res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(updateMachineFail({message: err}));
         });
   };
};

export const deleteMachineStart = () => {
   return {
      type: actionTypes.DELETE_MACHINE_START
   };
};

export const deleteMachineSuccess = (data) => {
   return {
      type: actionTypes.DELETE_MACHINE_SUCCESS,
      data: data
   };
};

export const deleteMachineFail = (error) => {
   return {
      type: actionTypes.DELETE_MACHINE_FAIL,
      error: error
   };
};

export const deleteMachine = (token, data) => {
   return dispatch => {
      dispatch(deleteMachineStart());
         
      axios.post("/simple-jwt-authentication/v1/eliminar-maquinaria", data, { headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(deleteMachineSuccess());
            }else{
               dispatch(deleteMachineFail({message:  res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(deleteMachineFail({message: err}));
         });
   };
};