import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MessageList from './MessageList';
import FullUsersList from './UserLists/FullUsersList/FullUsersList'
import OnlineUsersList from './UserLists/OnlineUsersList/OnlineUsersList';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Avatar, IconButton, Tooltip, Typography } from '@material-ui/core';

import { io } from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#131314',
    width: '100%',
    maxWidth: '2560px'
  },
  userHeaderWrapper: {
    width: '100%',
    borderBottom: '4px solid #cc486b'
  },
  userHeader: {
    display: 'flex',
    flex: '0 0 auto',
    color: '#fefefe',
    alignItems: 'center',
    backgroundColor: '#131314',
    justifyContent: 'space-between',
    borderRadius: '4px',
    maxWidth: '1180px',
    margin: '0 auto',
  },
  userAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    marginRight: '15px'
  },
  avatar: {
    background: '#A0DAA9',
    color: 'black',
    borderRadius: '50%',
    margin: '10px',
    height: '50px',
    width: '50px',
  },
  username: {
    fontSize: '24px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    display: "flex",
    flex: '1 0 auto',
    maxWidth: '1180px',
    margin: '0 auto'
  },
  root: {
    "& .MuiPaper-root": {
      background: 'linear-gradient(to top left, #13131490 50%, #cc486b50 100%)',
      backdropFilter: 'blur(6px)'
    },
  },
  dialogActions: {
    borderTop: '4px solid #cc486b',
    background: '#fefefe',
  },
  dialogContent: {
    color: '#fefefe',
    padding: '25px 10px'
  }
}));

export default function Chat({ history }) {
  const [open, setOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState({})
  const [newSocket, setNewSocket] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [usersInChat, setUsersInChat] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [messages, setMessages] = useState([])
  const [lastMessages, setLastMessages] = useState({})
  const classes = useStyles();

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      query: { token: localStorage.getItem("Acces Token") }
    });
    
    setNewSocket(socket)

    socket.on('userData', setCurrentUser);

    socket.on('allUsersListForAdmin', setAllUsers);

    socket.on('onlineUsers', setUsersInChat);

    socket.on('allmessages', setMessages);

    socket.on('lastMessages', setLastMessages);

    socket.on('newMessage', (message) => {
      setMessages((prevState) => [...prevState, message]);
    })

    socket.on('disconnect', () => {
      localStorage.removeItem("Acces Token")
      history.push('/')
    })

    return () => socket.disconnect(true);

  }, [])

  const handleClick = (data) => {
    // if(data.content.length || data.isFile) {
      newSocket.emit('message', data);
    // }
  }

  const handleSendEdit = (data) => {
    newSocket.emit('editMessage', data);
  }

  const handleChangeBan = (data) => {
    newSocket.emit('ban', data);
  }

  const handleChangeMut = (data) => {
    newSocket.emit('mut', data);
  }

  const logOut = () => {
    localStorage.removeItem("Acces Token")
    history.push('/')
  }

  const handleEdit = (data) => {
    setEditedMessage(data)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      {currentUser && currentUser.nickName
        ?
        <div className={classes.userHeaderWrapper}>
        <div className={classes.userHeader}>
          <div className={classes.userInfo}>
            <div className={classes.userAvatar}>
              <Avatar className={classes.avatar}>
                {currentUser.nickName.charAt(0)}
              </Avatar>
            </div>
          </div>
          <Typography className={classes.username}>
            {currentUser.nickName}
          </Typography>
          <Tooltip title="Log Out">
            <IconButton color="primary" aria-label="Log Out" onClick={handleClickOpen}>
              <ExitToAppIcon style={{ fontSize: '45px', color: '#fefefe' }} />
            </IconButton>
          </Tooltip>
        </div>
        </div>
        :
        null
      }
      <div className={classes.main}>
        {
          currentUser && currentUser.role === "ADMIN"
            ?
            <FullUsersList
              allUsers={allUsers}
              usersInChat={usersInChat}
              currentUser={currentUser}
              lastMessages={lastMessages}
              handleChangeBan={handleChangeBan}
              handleChangeMut={handleChangeMut}
            />
            :
            <OnlineUsersList
              usersInChat={usersInChat}
              currentUser={currentUser}
              lastMessages={lastMessages}
            />
        }
        <MessageList
          messages={messages}
          history={history}
          handleClick={handleClick}
          currentUser={currentUser}
          handleEdit={handleEdit}
          editedMessage={editedMessage}
          handleSendEdit={handleSendEdit} 
          />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.root}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent >
          <DialogContentText id="dialog-description" className={classes.dialogContent}>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="outlined" onClick={handleClose} color="secondary">
            CANCEL
          </Button>
          <Button variant="contained" onClick={logOut} color="primary" autoFocus>
            LOG OUT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}