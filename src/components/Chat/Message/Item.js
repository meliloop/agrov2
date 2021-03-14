import React from 'react';
import parse from 'html-react-parser';
import moment from 'moment';

const Message = (props) => {
    const data   = props.data;
    const userId = localStorage.getItem('userId');
    const sentDate =  moment(data.sent_date).format("DD/MM/YYYY HH:mm");

    return (
        <div className="messages__item">
            <div 
                className={`message-item-cont 
                            ${data.userid_from === userId ? 'right':'left'}`}
                style={{textAlign: (data.userid_from === userId ? 'right':'left')}}
            >{/* TO-DO: temporal hasta estios. volar este style */}
                <div className="message-text">
                    <p>{parse(data.message_text)}</p>
                </div>

                <div className="date-cont">
                    {sentDate} hs
                </div>
            </div>
        </div>
    );
};

export default Message;