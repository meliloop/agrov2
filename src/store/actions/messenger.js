import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchChatsStart = () => {
    return {
       type: actionTypes.FETCH_CHATS_START
    };
};
 
export const fetchChatsSuccess = (data) => {
    return {
       type: actionTypes.FETCH_CHATS_SUCCESS,
       chats: data
    };
};
 
export const fetchChatsFail = (error) => {
    return {
       type: actionTypes.FETCH_CHATS_FAIL,
       error: error
    };
};

export const fetchMessagesStart = () => {
    return {
       type: actionTypes.FETCH_MESSAGES_START
    };
};
 
export const fetchMessagesSuccess = (data, contact) => {
    return {
       type: actionTypes.FETCH_MESSAGES_SUCCESS,
       messages: data,
       contact: contact
    };
};
 
export const fetchMessagesFail = (error) => {
    return {
       type: actionTypes.FETCH_MESSAGES_FAIL,
       error: error
    };
};

export const fetchUnreadMessagesStart = () => {
    return {
       type: actionTypes.FETCH_UNREAD_MESSAGES_START
    };
};
 
export const fetchUnreadMessagesSuccess = (qty) => {
    return {
        type: actionTypes.FETCH_UNREAD_MESSAGES_SUCCESS,
        unread: qty
    };
};
 
export const sendMessageStart = () => {
    return {
       type: actionTypes.SEND_MESSAGE_START
    };
};
 
export const sendMessageSuccess = () => {
    return {
       type: actionTypes.SEND_MESSAGE_SUCCESS
    };
};
 
export const sendMessageFail = (error) => {
    return {
       type: actionTypes.SEND_MESSAGE_FAIL,
       error: error
    };
};

export const fetchUnreadMessagesFail = (error) => {
    return {
       type: actionTypes.FETCH_UNREAD_MESSAGES_FAIL,
       error: error
    };
};

export const fetchChats = (token, userId) => {
    return dispatch => {
        dispatch(fetchChatsStart());
            
        axios.post("/simple-jwt-authentication/v1/chats",{ id: userId },{ 
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then((res) => {
            if( res.data.result === 'ok' )
                dispatch(fetchChatsSuccess(res.data.chats));
            else 
                dispatch(fetchChatsFail(res.data.err));
        })
        .catch((err) => {
            dispatch(fetchChatsFail(err));
        });
    }
};

export const fetchMessages = (token, data) => {
    return dispatch => {
        dispatch(fetchMessagesStart());
            
        axios.post("/simple-jwt-authentication/v1/chat/mensajes",data,{ 
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then((res) => {
            if( res.data.result === 'ok' )
                dispatch(fetchMessagesSuccess(res.data.messages, res.data.contact ));
            else 
                dispatch(fetchMessagesFail(res.data.err));
        })
        .catch((err) => {
            dispatch(fetchMessagesFail(err));
        });
    }
};

export const fetchUnreadMessages = (token, userId) => {
    return dispatch => {
        dispatch(fetchUnreadMessagesStart());
            
        axios.post("/simple-jwt-authentication/v1/mensajesnuevos",{ id: userId },{
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then((res) => {
            if( res.data.result === 'ok' )
                dispatch(fetchUnreadMessagesSuccess(res.data.unread));
            else 
                dispatch(fetchUnreadMessagesFail(res.data.err));
        })
        .catch((err) => {
            dispatch(fetchUnreadMessagesFail(err));
        });
    }
};

export const sendMessage = (token, data) => {
    return dispatch => {
        dispatch(sendMessageStart());

        axios.post("/simple-jwt-authentication/v1/chat/nuevo-mensaje",data,{
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then((res) => {
            if( res.data.result === 'ok' ){
                dispatch(sendMessageSuccess());
                dispatch(fetchMessages(token, {'me': data.from, 'other': data.to}));
            }else{
                dispatch(sendMessageFail(res.data.err));
            }
        })
        .catch((err) => {
            dispatch(sendMessageFail(err));
        });
    }
};