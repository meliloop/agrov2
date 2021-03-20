import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
   token: null,
   userId: null,
   error: null,
   authSuccess: false,
   registerSuccess: false,
   updateSuccess: false,
   loading: false,
   authRedirectPath: '/mi-cuenta',
   data: null,
};

const authStart  = (state, action)  => updateObject( state, { error: null, loading: true, registerSuccess: false, authSuccess: false} );
const authFail   = (state, action)  => updateObject( state, { error: action.error, loading: false, registerSuccess: false, authSuccess: false });
const authSuccess= (state, action)  => updateObject( state, { token: action.token, userId: action.userId, error: null, loading: false, registerSuccess: false, authSuccess: true});
const authLogout = (state, action)  => updateObject( state, { token: null, userId: null });

const setAuthRedirectPath     = ( state, action )  => updateObject( state, { authRedirectPath: action.path });

const fetchUserStart          = ( state, action )  => updateObject( state, { loading: true, error: null } );
const fetchUserSuccess        = ( state, action )  => updateObject( state, { data: action.data, loading: false});
const fetchUserFail           = ( state, action )  => updateObject( state, { loading: false, error: action.error });

const userRegisterStart       = ( state, action )  => updateObject( state, { loading: true, error: null } );
const userRegisterSuccess     = ( state, action )  => updateObject( state, { error: null, data: action.data, loading: false, registerSuccess: true, authSuccess: false});
const userRegisterFail        = ( state, action )  => updateObject( state, { loading: false, error: action.error });

const userAccountUpdateStart  = ( state, action )  => updateObject( state, { loading: true, error: null } );
const userAccountUpdateSuccess= ( state, action )  => updateObject( state, { data: action.data, loading: false, updateSuccess: true});
const userAccountUpdateFail   = ( state, action )  => updateObject( state, { loading: false, error: action.error });

const authClearErrors         = ( state, action )  => updateObject( state, { error: null, updateSuccess: null, registerSuccess: null });

const reducer = ( state = initialState, action ) => {
   switch ( action.type ) {
      case actionTypes.AUTH_START: return authStart(state, action);
      case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
      case actionTypes.AUTH_FAIL: return authFail(state, action);
      case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
      case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
      case actionTypes.REGISTER_START: return userRegisterStart(state, action);
      case actionTypes.REGISTER_SUCCESS: return userRegisterSuccess(state, action);
      case actionTypes.REGISTER_FAIL: return userRegisterFail(state, action);
      case actionTypes.USER_UPDATE_START: return userAccountUpdateStart(state, action);
      case actionTypes.USER_UPDATE_SUCCESS: return userAccountUpdateSuccess(state, action);
      case actionTypes.USER_UPDATE_FAIL: return userAccountUpdateFail(state, action);
      case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
      case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
      case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
      case actionTypes.AUTH_CLEAR_ERROR: return authClearErrors(state, action);
      default: return state;
   }
};

export default reducer;