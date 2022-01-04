import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import LastMessage from '../LastMessage/LastMessage';

import useStyles from './onlineUsersListStyles'

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#cc486b',
    color: '#44b700',
    boxShadow: '0 0 0 3px #131314',
  },
}))(Badge);

export default function OnlineUsersList({ usersInChat, currentUser, lastMessages }) {
  const classes = useStyles();
  return (
    <div className={classes.userList}>
      {usersInChat && usersInChat.length > 0
        ?
        usersInChat.map((current) => {
          return (
            currentUser.nickName !== current
              ?
              <div key={current} className={classes.user}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar>{current.charAt(0)}</Avatar>
                </StyledBadge>
                <div className={classes.infoBlock}>
                  <div className={classes.nick}>
                    {current}
                  </div>
                  {lastMessages.length
                    ?
                    lastMessages.map(message => (message.user_nickName === current)
                      ?
                      <LastMessage key={message.user_id} message={message}/>
                      :
                      null
                    ) : null
                  }
                </div>
              </div>
              :
              null
          )
        })
        :
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      }
    </div>
  )
}