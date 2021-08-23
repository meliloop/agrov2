import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchServiceStart = () => {
   return {
      type: actionTypes.FETCH_SERVICE_START
   };
};
 
export const fetchServiceSuccess = (data) => {
   return {
      type: actionTypes.FETCH_SERVICE_SUCCESS,
      machine: data
   };
};

export const fetchServiceFail = (error) => {
   return {
      type: actionTypes.FETCH_SERVICE_FAIL,
      error: error
   };
};

export const clearFetchService = () => {
   return {
      type: actionTypes.FETCH_SERVICE_CLEAR
   };
};

export const fetchService = (data) => {
   return dispatch => {
      dispatch(fetchServiceStart());
         
      axios.post("/agro/v1/servicio/", data)
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(fetchServiceSuccess(res.data.servicio));
                  
               res.data.servicio.caracteristicas && dispatch( setCaracteristicasService(res.data.servicio.caracteristicas) );
                  
               res.data.servicio.fechas.sort((a, b) => (a.order > b.order) ? 1 : -1)
               res.data.servicio.fechas && dispatch( setCalendarDatesService(res.data.servicio.fechas) );
               res.data.servicio.tipo_servicio && dispatch( setTipoPadreService(res.data.servicio.tipo_servicio.id) );
               res.data.servicio.cabezales && res.data.servicio.cabezales.map(item => dispatch( setTiposService(item.id) ) );
            }else{
               dispatch(fetchServiceFail({message: res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(fetchServiceFail({message: err}));
         });
   };
};

export const fetchServiceTypeStart = () => {
   return {
      type: actionTypes.FETCH_SERVICETYPES_START
   };
};

export const fetchServiceTypeSuccess = (data) => {
   return {
      type: actionTypes.FETCH_SERVICETYPES_SUCCESS,
      data: data
   };
};

export const fetchServiceTypeFail = (error) => {
   return {
      type: actionTypes.FETCH_SERVICETYPES_FAIL,
      error: error
   };
};

export const fetchServiceTypes = () => {
   return dispatch => {
      dispatch(fetchServiceTypeStart());
        
      axios.post("/agro/v1/tipos-servicio")
         .then((res) => {
            console.log(res);
            if( res.data.result === 'ok' )
               dispatch(fetchServiceTypeSuccess(res.data.tipos));
            else 
               dispatch(fetchServiceTypeFail(res.data.err));
         })
         .catch((err) => {
            dispatch(fetchServiceTypeFail(err));
         });
   };
};

export const setTipoPadreService = ( tipo ) => {
   return {
      type: actionTypes.SERVICE_MAINTYPE_CHANGED,
      tipo: tipo
   };
};

export const setTiposService = ( tipo ) => {
   return {
      type: actionTypes.SERVICE_OTHERTYPES_CHANGED,
      tipo: tipo
   };
};

export const setCaracteristicasService = ( caracteristicas ) => {
   return {
      type: actionTypes.SERVICE_SET_CARACTERISTICAS,
      caracteristicas: caracteristicas
   };
};

export const addCaracteristicaService = ( caracteristica ) => {
   return {
      type: actionTypes.SERVICE_ADD_CARACTERISTICA,
      caracteristica: caracteristica
   };
};

export const removeCaracteristicaService = ( key ) => {
   return {
      type: actionTypes.SERVICE_REMOVE_CARACTERISTICA,
      key: key
   };
};

export const setCalendarDatesService = ( fechas ) => {
   return {
      type: actionTypes.SERVICE_SET_CALENDARDATES,
      fechas: fechas
   };
};

export const addCalendarDateService = ( fecha ) => {
   return {
      type: actionTypes.SERVICE_ADD_CALENDARDATE,
      fecha: fecha
   };
};

export const removeCalendarDateService = ( key ) => {
   return {
      type: actionTypes.SERVICE_REMOVE_CALENDARDATE,
      key: key
   };
};

export const createServiceStart = () => {
   return {
      type: actionTypes.CREATE_SERVICE_START
   };
};

export const createServiceSuccess = (data) => {
   return {
      type: actionTypes.CREATE_SERVICE_SUCCESS,
      data: data
   };
};

export const createServiceFail = (error) => {
   return {
      type: actionTypes.CREATE_SERVICE_FAIL,
      error: error
   };
};

export const updateServiceStart = () => {
   return {
      type: actionTypes.UPDATE_SERVICE_START
   };
};

export const updateServiceSuccess = (data) => {
   return {
      type: actionTypes.UPDATE_SERVICE_SUCCESS,
      data: data
   };
};

export const updateServiceFail = (error) => {
   return {
      type: actionTypes.UPDATE_SERVICE_FAIL,
      error: error
   };
};

export const createService = (token, data) => {
   return dispatch => {
      dispatch(createServiceStart());
         
      axios.post("/simple-jwt-authentication/v1/crear-servicio", data, { headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(createServiceSuccess(res.data.servicio));
            }else{
               dispatch(createServiceFail({message:  res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(createServiceFail({message: err}));
         });
   };
};

export const updateService = (token, data) => {
   return dispatch => {
      dispatch(updateServiceStart());
         
      axios.post("/simple-jwt-authentication/v1/editar-servicio", data, { headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(updateServiceSuccess(res.data.servicio));
            }else{
               dispatch(updateServiceFail({message:  res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(updateServiceFail({message: err}));
         });
   };
};

export const deleteServiceStart = () => {
   return {
      type: actionTypes.DELETE_SERVICE_START
   };
};

export const deleteServiceSuccess = (data) => {
   return {
      type: actionTypes.DELETE_SERVICE_SUCCESS,
      data: data
   };
};

export const deleteServiceFail = (error) => {
   return {
      type: actionTypes.DELETE_SERVICE_FAIL,
      error: error
   };
};

export const deleteService = (token, data) => {
   return dispatch => {
      dispatch(deleteServiceStart());
         
      axios.post("/simple-jwt-authentication/v1/eliminar-servicio", data, { headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(deleteServiceSuccess());
            }else{
               dispatch(deleteServiceFail({message:  res.data.err}));
            }
         })
         .catch((err) => {
            dispatch(deleteServiceFail({message: err}));
         });
   };
};