import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
   loading: true,
   member: null,
   machine: null,
   error: null,
};

const fetchMemberStart = ( state, action ) => updateObject( state, { loading: true } );
const fetchMemberSuccess=( state, action ) => updateObject( state, {member: action.member,loading: false} );
const fetchMemberFail  = ( state, action ) => updateObject( state, { loading: false } );

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_MEMBER_START:    return fetchMemberStart(state, action);
        case actionTypes.FETCH_MEMBER_SUCCESS:  return fetchMemberSuccess(state, action);
        case actionTypes.FETCH_MEMBER_FAIL:     return fetchMemberFail(state, action);
        default: return state;
    }
};

export default reducer;