import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Badge from '@material-ui/core/Badge';

import { fetchUnreadMessages } from '../../store/actions/index';
import { IconContact } from "../UI/Icon/Icon";

function useInterval(callback, delay){
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if( delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const Unread = () => {
    const msgState = useSelector(state => state.messenger);
    const dispatch = useDispatch();

    const getNew = () => dispatch( fetchUnreadMessages(localStorage.getItem('token'), localStorage.getItem('userId')) );

    useEffect(() => {
        localStorage.getItem('userId') && getNew()
    },[]);

    useInterval(() => {
        localStorage.getItem('userId') && getNew()
    }, 30000);

    return (
        <Link to={'/mi-cuenta'}>
            <Badge badgeContent={msgState.unread} color="primary">
                <IconContact />
            </Badge>
        </Link>
    )
}

export default Unread;