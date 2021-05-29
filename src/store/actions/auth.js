import axios from '../../axios-instance';
import * as actionTypes from './actionTypes';

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   };
};

export const authSuccess = (token, userId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      token: token,
      userId: userId
   };
};

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   };
};

export const recoverStart = () => {
   return {
      type: actionTypes.RECOVER_START
   };
};

export const recoverSuccess = () => {
   return {
      type: actionTypes.RECOVER_SUCCESS,
   };
};

export const recoverFail = (error) => {
   return {
      type: actionTypes.RECOVER_FAIL,
      error: error
   };
};


export const registerStart = () => {
   return {
      type: actionTypes.REGISTER_START
   };
};

export const registerSuccess = () => {
   return {
      type: actionTypes.REGISTER_SUCCESS,
   };
};

export const registerFail = (error) => {
   return {
      type: actionTypes.REGISTER_FAIL,
      error: error
   };
};

export const userUpdateStart = () => {
   return {
      type: actionTypes.USER_UPDATE_START
   };
};

export const userUpdateSuccess = (data) => {
   return {
      type: actionTypes.USER_UPDATE_SUCCESS,
      data: data
   };
};

export const userUpdateFail = (error) => {
   return {
      type: actionTypes.USER_UPDATE_FAIL,
      error: error
   };
};

export const logout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('expirationDate');
   localStorage.removeItem('userId');
   return {
      type: actionTypes.AUTH_LOGOUT
   };
};

export const fetchUserStart = () => {
   return {
      type: actionTypes.FETCH_USER_START
   };
};

export const fetchUserSuccess = (data) => {
   return {
      type: actionTypes.FETCH_USER_SUCCESS,
      data: data
   };
};

export const fetchUserFail = (error) => {
   return {
      type: actionTypes.FETCH_USER_FAIL,
      error: error
   };
};

export const fetchUser = (token, userId) => {
   return dispatch => {
      dispatch(fetchUserStart());
      
      axios.post("/simple-jwt-authentication/v1/dashboard",{ id: userId },{ headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' )
               dispatch(fetchUserSuccess(res.data.usuario));
            else 
               dispatch(fetchUserFail(res.data.err));
         })
         .catch((err) => {
            dispatch(fetchUserFail(err));
         });
   }
};

export const clearAuthErrors = () => {
   return {
      type: actionTypes.AUTH_CLEAR_ERROR,
      error: null
   }
};

export const auth = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      const authData = { username: email, password: password };

      axios.post('/simple-jwt-authentication/v1/token', authData)
         .then(response => {
            const expirationDate = new Date(response.data.token_expires*1000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.user_id);
            window.webpushr('attributes', {"User ID" : response.data.user_id,  "E-mail" : email});
            dispatch(authSuccess(response.data.token, response.data.user_id));
         })
         .catch(err => {
            dispatch(authFail({message: 'Por favor revise los datos y vuelva a intentarlo'}));
         });
   };
};

export const recover = (email) => {
   return dispatch => {
      dispatch(recoverStart());

      axios.post("/agro/v1/usuario/recover", {username: email})
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(recoverSuccess());
            }else{
               dispatch(recoverFail(res.data.err));
            }
         })
         .catch((err) => {
            dispatch(recoverFail(err));
         });
   }
};

export const setAuthRedirectPath = (path) => {
   return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path
   };
};

export const authCheckState = () => {
   return dispatch => {
      // reemplazar por esto 
      // https://github.com/jonathan-dejong/simple-jwt-authentication/wiki/Documentation#wp-jsonsimple-jwt-authenticationv1tokenvalidate
      const token = localStorage.getItem('token');
      
      if (!token) {
         dispatch(logout());
      } else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'));
         if (expirationDate <= new Date()) {
            dispatch(logout());
         } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
         }   
      }
   };
};

export const userRegister = (data) => {
   return dispatch => {
      dispatch(registerStart());

      axios.post("/agro/v1/usuario/register", data)
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(registerSuccess());
            }else{
               dispatch(registerFail(res.data.err));
            }
         })
         .catch((err) => {
            dispatch(registerFail(err));
         });
   }
};

export const userUpdate = (token, userId, data) => {
   return dispatch => {
      dispatch(userUpdateStart());
         
      data.id  =  userId;
      axios.post("/simple-jwt-authentication/v1/userupdate", data,{ headers: { 'Authorization': 'Bearer ' + token } })
         .then((res) => {
            if( res.data.result === 'ok' ){
               dispatch(userUpdateSuccess(res.data.usuario));
            }else{
               dispatch(userUpdateFail(res.data.err));
            }
         })
         .catch((err) => {
            dispatch(userUpdateFail(err));
         });
   }
};