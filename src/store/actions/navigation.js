import * as actionTypes from './actionTypes';

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