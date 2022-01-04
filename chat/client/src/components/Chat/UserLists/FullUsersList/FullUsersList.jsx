import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import BanMute from '../../admin/BanMuteSection';
import LastMessage from '../LastMessage/LastMessage';

import useStyles from './fullUsersListstyles';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#cc486b',
    color: '#cc486b',
    boxShadow: '0 0 0 3px #131314',
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

export default function FullUsersList({ allUsers, usersInChat, currentUser, lastMessages, handleChangeBan, handleChangeMut }) {
  // const [users, setUsers] = useState([])
  const classes = useStyles();

  // useEffect(() => {
  //   setUsers(allUsers)
  // }, [allUsers])
  return (
    <div className={classes.userList}>
      {allUsers.map(user => {
        const { nickName, id } = user
        return (
          currentUser.nickName !== nickName
            ?
            <Accordion
              key={id}
              className={classes.accordion}
            >
              <AccordionSummary
                className={classes.mainInfo}
                expandIcon={<ExpandMoreIcon style={{ color: '#fefefe' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <StyledBadge
                  overlap="circular" anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant={
                    usersInChat.some((item) => item === nickName) ? ("dot") : (null)
                  }
                >
                  <Avatar>{nickName.charAt(0)}</Avatar>
                </StyledBadge>
                <div className={classes.userName}>
                  {nickName}
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.AccordionDetails}>
                {lastMessages.length
                  ?
                  lastMessages.map(message => (message.user_nickName === user.nickName)
                    ?
                    <LastMessage key={message.user_id} message={message} />
                    :
                    null
                  ) : null
                }
                <BanMute
                  user={user}
                  handleChangeBan={handleChangeBan}
                  handleChangeMut={handleChangeMut} />
              </AccordionDetails>
            </Accordion>
            :
            null
        )
      })
      }
    </div>
  )
}