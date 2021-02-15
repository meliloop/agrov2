import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
   loading: true,
   chats: [],
   messages: [],
   unread: 0,
   currentChat: null,
   contact: null,
};

const fetchChatsStart    = ( state, action ) => updateObject( state, { loading: true } );
const fetchChatsFail     = ( state, action ) => updateObject( state, { loading: false } );
const fetchChatsSuccess  = ( state, action ) => {
    return updateObject( state, {
        chats: action.chats,
        loading: false
    } );
};

const fetchMessagesStart    = ( state, action ) => updateObject( state, { loading: true } );
const fetchMessagesFail     = ( state, action ) => updateObject( state, { loading: false } );
const fetchMessagesSuccess  = ( state, action ) => {
    return updateObject( state, {
        messages: action.messages,
        contact: action.contact,
        loading: false
    } );
};

const fetchUnreadMessagesStart    = ( state, action ) => updateObject( state, { loading: true } );
const fetchUnreadMessagesFail     = ( state, action ) => updateObject( state, { loading: false } );
const fetchUnreadMessagesSuccess  = ( state, action ) => {
    return updateObject( state, {
        unread: action.unread,
        loading: false
    });
};

const setReadedMessagesStart    = ( state, action ) => updateObject( state, { loading: true } );
const setReadedMessagesFail     = ( state, action ) => updateObject( state, { loading: false } );
const setReadedMessagesSuccess  = ( state, action ) => updateObject( state, { loading: false } );

const setSendMessageStart       = ( state, action ) => updateObject( state, { loading: true } );
const setSendMessageFail        = ( state, action ) => updateObject( state, { loading: false } );
const setSendMessageSuccess     = ( state, action ) => updateObject( state, { loading: false } );

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CHATS_START:
            return fetchChatsStart(state, action);
        case actionTypes.FETCH_CHATS_SUCCESS:
            return fetchChatsSuccess(state, action);
        case actionTypes.FETCH_CHATS_FAIL:
            return fetchChatsFail(state, action);
        case actionTypes.FETCH_MESSAGES_START:
            return fetchMessagesStart(state, action);
        case actionTypes.FETCH_MESSAGES_SUCCESS:
            return fetchMessagesSuccess(state, action);
        case actionTypes.FETCH_MESSAGES_FAIL:
            return fetchMessagesFail(state, action);
        case actionTypes.FETCH_UNREAD_MESSAGES_START:
            return fetchUnreadMessagesStart(state, action);
        case actionTypes.FETCH_UNREAD_MESSAGES_SUCCESS:
            return fetchUnreadMessagesSuccess(state, action);
        case actionTypes.FETCH_UNREAD_MESSAGES_FAIL:
            return fetchUnreadMessagesFail(state, action);
        case actionTypes.SET_READED_MESSAGE_START:
            return setReadedMessagesStart(state, action);
        case actionTypes.SET_READED_MESSAGE_SUCCESS:
            return setReadedMessagesSuccess(state, action);
        case actionTypes.SET_READED_MESSAGE_FAIL:
            return setReadedMessagesFail(state, action);
        case actionTypes.SEND_MESSAGE_START:
            return setSendMessageStart(state, action);
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return setSendMessageSuccess(state, action);
        case actionTypes.SEND_MESSAGE_FAIL:
            return setSendMessageFail(state, action);               
        default: 
            return state;
    }
};

export default reducer;