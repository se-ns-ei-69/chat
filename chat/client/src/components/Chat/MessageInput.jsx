import React, { useEffect, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Tooltip } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import Resizer from "react-image-file-resizer";

// import CancelIcon from '@mui/icons-material/icons/Cancel';

import useStyles from './messageInputStyles'
import Image from './Image';

export default function MessageInput({ handleClick, editedMessage, handleSendEdit }) {
  const { edit, content, user, id } = editedMessage
  const initialMessageState = {
    content: '',
    isFile: false,
    file: {},
    fileName: ''
  }
  const [message, setMessage] = useState(initialMessageState);
  const [file, setFile] = useState()
  const [blob, setBlob] = useState()


  const onChangeInput = (e) => {
      const { value } = e.target;
      if (value.length <= 200) {
        setMessage({ ...message, content: value })
      }
  }

  const selectFile = (e) => {
      if (e.target?.files) {
        const file = e.target.files[0];
        setMessage({ ...message, isFile: true, file, fileName: file.name });
        setFile(file);
        const newBlob = new Blob([file], { type: e.target.files[0].type })
        setBlob(newBlob)
      }
  }

  const classes = useStyles();

  return (
    <div>
      {
        edit
          ?
          <div className={classes.editBase}>
            <div className={classes.editInfo}>
              <EditIcon style={{ color: '#cc486b', fontSize: '24px', margin: '10px' }} />
              <div>
                <div className={classes.edit}>
                  Edit message
                </div>
                <div className={classes.editContent}>
                  {content}
                </div>
              </div>
            </div>
            <IconButton onClick={() => {
              setMessage(initialMessageState)
              editedMessage.edit = false
            }}>
              <CloseIcon style={{ color: '#fefefe80', fontSize: '24px' }} />
            </IconButton>
          </div>
          : null}
      {file
        ?
        <div className={classes.imageBlock}>
          <Image blob={blob} fileName={message.fileName} />
          {/* <CloseIcon
            style={
              {
                color: '#cc486b',
                fontSize: '24px',
                cursor: 'pointer'
              }
            }
            onClick={() => {
              setMessage({
                ...message,
                isFile: false,
                file: {},
                fileName: ''
              })
              setFile()
            }
            }
          /> */}
        </div>
        : null}
      <div component="div" className={classes.root}>
        <Tooltip title="Attach image">
          <IconButton component="label">
            <AttachFileIcon style={{ color: '#fefefe80', transform: 'rotate(-145deg)', fontSize: '24px' }} />
            <input type="file" name="file" hidden  accept="image/png, image/gif, image/jpeg" onChange={selectFile} />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
          multiline
          maxRows={4}
          maxLength={200}
          className={classes.input}
          value={message.content}
          onChange={onChangeInput}
          placeholder={"Cообщение..."}
          inputProps={{ 'aria-label': 'Cообщение...' }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              edit
                ?
                (handleSendEdit({ content: message.content, id, user }))
                :
                (handleClick(message))
              setMessage(initialMessageState)
              editedMessage.edit = false
            }
          }
          }
        />
        <Divider className={classes.divider} orientation="vertical" />
        <span className={classes.messageLengthCounter}>
          {message.content.length} / 200
        </span>
        <Divider className={classes.divider} orientation="vertical" />
        <Tooltip title="Send message">
          <IconButton
            style={{ color: "#cc486b" }}
            className={classes.iconButton}
            aria-label="directions"
            onClick={() => {
              edit
                ?
                (handleSendEdit({ content: message.content, id, user }))
                :
                (handleClick(message))
              setMessage(initialMessageState)
              setFile()
              editedMessage.edit = false
            }
            }
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}