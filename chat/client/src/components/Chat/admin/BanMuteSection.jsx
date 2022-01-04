import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import useStyles from './banMutStyles';

export default function BanMute({ user, handleChangeBan, handleChangeMut }) {
  const [ban, setBan] = useState(user.banned);
  const [mut, setMut] = useState(user.mutted);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            classes={{ track: classes.track }}
            checked={ban}
            onChange={() => {
              (handleChangeBan({
                nickName: user.nickName,
                id: user.id
              }))
              setBan(!ban);
            }}
            name="Ban"
          />
        }
        label="Ban"
      />
      <FormControlLabel
        control={
          <Switch
            classes={{ track: classes.track }}
            checked={mut}
            onChange={() => {
              (handleChangeMut({
                nickName: user.nickName,
                id: user.id
              }))
              setMut(!mut);
            }}
            name="Mute"
            color="primary"
          />
        }
        label="Mute"
      />
    </div>
  )
}