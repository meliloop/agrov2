import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
   currentContainer: 'landing',
};

const setCurrentNavigation = ( state, action ) => updateObject( state, { currentContainer: action.container } );

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NAV_CHANGED:       return setCurrentNavigation(state, action);
        default: return state;
    }
};

export default reducer;