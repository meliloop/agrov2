import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchMemberStart = () => {
    return {
       type: actionTypes.FETCH_MEMBER_START
    };
};

export const fetchMemberSuccess = (data) => {
    return {
        type: actionTypes.FETCH_MEMBER_SUCCESS,
        member: data
    };
};

export const fetchMemberFail = (error) => {
    return {
        type: actionTypes.FETCH_MEMBER_FAIL,
        error: error
    };
};

export const fetchMember = (data) => {
    return dispatch => {
        dispatch(fetchMemberStart());
            
        axios.post("/agro/v1/usuario/", data)
            .then((res) => {
                if( res.data.result === 'ok' )
                    dispatch(fetchMemberSuccess(res.data.usuario));
                else 
                    dispatch(fetchMemberFail(res.data.err));
            })
            .catch((err) => {
                dispatch(fetchMemberFail(err));
            });
    };
};