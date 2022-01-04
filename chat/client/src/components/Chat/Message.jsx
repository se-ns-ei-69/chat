import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from './messageStyles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        background: 'linear-gradient(to top left, #13131490 10%, #cc486b80 100%)',
        color: '#fefefe',
        padding: '15px',
        boxShadow: theme.shadows[1],
        fontSize: 12,
    },
}))(Tooltip);

export default function Message({ currentUser, message, handleEdit }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();

    const handleClick = (event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = () => {
        setAnchorEl(null);
    };

    const handleReply = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={
            currentUser.nickName === message.user.nickName
                ?
                classes.myMessage
                :
                classes.otherMessage
        }
        >
            {currentUser.nickName !== message.user.nickName ?
                <LightTooltip title={message.user.nickName}>
                    <Avatar><div>{message.user.nickName.charAt(0)}</div></Avatar>
                </LightTooltip>
                :
                null
            }
            <div className={
                currentUser.nickName === message.user.nickName
                    ?
                    classes.messageContent
                    :
                    classes.messageContentOtherAuthor
            }
            >
                {
                    message.imageUrl.length ? <img className={classes.messageImage} src={message.imageUrl} /> : null
                }
                {
                    message.content.length
                        ?
                        <div
                            className={
                                currentUser.nickName === message.user.nickName ?
                                    classes.message
                                    :
                                    classes.otherAuthor
                            }
                            onContextMenu={handleClick}
                            aria-controls="message-menu"
                            aria-haspopup="true"
                        >

                            <p className={classes.messageText}>
                                {message.content}
                            </p>
                            {message.edited
                                ?
                                <p className={classes.editInfo}>edited</p> : null}
                        </div> : null}
            </div>
            <Menu
                id="message-menu"
                anchorEl={anchorEl}
                autoFocus={false}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
            >
                <MenuItem
                    // disabled
                    onClick={handleReply}
                    className={classes.menuItem}
                >
                    Reply
                </MenuItem>
                {
                    currentUser.nickName === message.user.nickName
                        ?
                        <MenuItem
                            className={classes.menuItem}
                            onClick={() => {
                                (handleEdit({ ...message, edit: true }))
                                setAnchorEl(null);
                            }}>
                            Edit
                        </MenuItem> : null}
                <MenuItem
                    className={classes.menuItem}
                    // disabled
                    onClick={handleDelete}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    )
}
