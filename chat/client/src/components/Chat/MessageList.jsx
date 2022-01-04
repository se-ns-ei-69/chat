import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import GavelIcon from '@material-ui/icons/Gavel';

import MessageInput from './MessageInput';
import Message from './Message';

import useStyles from './messageListStyles'


export default function MessageList({ messages, currentUser, handleClick, handleEdit, editedMessage, handleSendEdit }) {
  const messagesEndRef = useRef(null);
  const classes = useStyles();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className={classes.chatSection}>

      {/* <AdvancedImage cldImg={myImage} /> */}
      <div className={classes.messageHistory}>
        {
          messages && messages.length > 0
            ?
            messages.map(message => <Message currentUser={currentUser} handleEdit={handleEdit} message={message} key={uuidv4()} />)
            :
            <div className={classes.loader}>
              <CircularProgress />
            </div>
        }
        <div className={classes.chatRules}>
          <GavelIcon style={{ color: '#cc486b' }} />
          Соблюдайте правила чата. Сообщения можно отправлять каждые 15 секунд
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className={classes.messageInputZone}>
        <Collapse in={currentUser.mutted}>
          <Alert variant="filled" severity="error">
            {currentUser.nickName}, you are muteded by ADMIN
          </Alert>
        </Collapse>
        <Collapse in={!currentUser.mutted}>
          <MessageInput
            editedMessage={editedMessage}
            currentUser={currentUser}
            handleClick={handleClick}
            handleSendEdit={handleSendEdit}
          />
        </Collapse>
      </div>
    </div>
  )
}