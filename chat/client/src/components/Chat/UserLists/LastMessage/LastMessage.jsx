import React from 'react';
import moment from 'moment';

import useStyles from './lastMessageStyles';

export default function LastMessage({ message }) {
    const classes = useStyles();

    return (
        <div className={classes.lastMessage}>
            <p className={classes.lastMessageContent}>
                {
                    message.lastMessage.length >= 20
                        ?
                        `${message.lastMessage.slice(0, 21)}...`
                        :
                        message.lastMessage
                }
            </p>
            <p className={classes.lastMessageContent}>
                {moment(message.createdAt).format(`hh:mm A`)}
            </p>
        </div>
    )
}
