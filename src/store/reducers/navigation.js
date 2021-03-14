import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
   currentContainer: 'search',
   isMessageOpen: false,
};

const setCurrentNavigation = ( state, action ) => updateObject( state, { currentContainer: action.container } );
const setMessageStatus     = ( state, action ) => updateObject( state, { isMessageOpen: action.status } );

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NAV_CHANGED:           return setCurrentNavigation(state, action);
        case actionTypes.POPUP_MESSAGE_CHANGED: return setMessageStatus(state, action);
        default: return state;
    }
};

export default reducer;