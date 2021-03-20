import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
   currentContainer: 'search',
   isMessageOpen: false,
   loading: false,
   content: null
};

const setCurrentNavigation  = ( state, action ) => updateObject( state, { currentContainer: action.container } );
const setMessageStatus      = ( state, action ) => updateObject( state, { isMessageOpen: action.status } );
const fetchPageStart        = ( state, action ) => updateObject( state, { loading: true } );
const fetchPageSuccess      = ( state, action ) => updateObject( state, { content: action.content, loading: false} );
const fetchPageFail         = ( state, action ) => updateObject( state, { loading: false } );

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NAV_CHANGED:           return setCurrentNavigation(state, action);
        case actionTypes.POPUP_MESSAGE_CHANGED: return setMessageStatus(state, action);
        case actionTypes.FETCH_PAGE_START:      return fetchPageStart(state, action);
        case actionTypes.FETCH_PAGE_SUCCESS:    return fetchPageSuccess(state, action);
        case actionTypes.FETCH_PAGE_FAIL:       return fetchPageFail(state, action);
        default: return state;
    }
};

export default reducer;