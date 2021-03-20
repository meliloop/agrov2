import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const setCurrentNavigation = (container) => {
    return {
        type: actionTypes.NAV_CHANGED,
        container: container
    };
};

export const setMessageStatus = (status) => {
    return {
        type: actionTypes.POPUP_MESSAGE_CHANGED,
        status: status
    };
};

export const fetchPageStart = () => {
    return {
       type: actionTypes.FETCH_PAGE_START
    };
};

export const fetchPageSuccess = (data) => {
    return {
        type: actionTypes.FETCH_PAGE_SUCCESS,
        content: data
    };
};

export const fetchPageFail = (error) => {
    return {
        type: actionTypes.FETCH_PAGE_FAIL,
        error: error
    };
};

export const fetchPage = (title) => {
    return dispatch => {
        dispatch(fetchPageStart());
            
        axios.post("/agro/v1/page/", {'title' : title} )
            .then((res) => {
                if( res.data.result === 'ok' )
                    dispatch(fetchPageSuccess(res.data.content));
                else 
                    dispatch(fetchPageFail(res.data.err));
            })
            .catch((err) => {
                dispatch(fetchPageFail(err));
            });
    };
};