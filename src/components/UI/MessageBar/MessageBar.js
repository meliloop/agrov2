import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setMessageStatus } from '../../../store/actions/index';

import CloseIcon from '@material-ui/icons/Close';

const MessageBar = (props) => {
    const navState = useSelector(state => state.nav);
    const dispatch = useDispatch();

    const handleClose = () => dispatch(setMessageStatus(false));
        
    return (
        <div>
            {navState.isMessageOpen &&
            <div className="contact-popup">
                <div className="row">
                    <CloseIcon onClick={handleClose} />
                    <p className={`${props.type}-msg`}>
                        {props.text}
                    </p>
                    {props.children}
                </div>
            </div>}
        </div>
    );
};

export default MessageBar;