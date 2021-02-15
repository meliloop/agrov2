import * as actionTypes from './actionTypes';

export const setCurrentNavigation = (container) => {
    return {
        type: actionTypes.NAV_CHANGED,
        container: container
    };
};