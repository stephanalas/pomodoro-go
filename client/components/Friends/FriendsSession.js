import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import LastSession from '../Dashboard/LastSession';
import TotalSessions from '../Dashboard/TotalSessions';

const useStyles = makeStyles((theme) => ({
  contain: {
    background: 'linear-gradient(110deg, #4a4d6c 60%, #fce7a9 60%)',
    padding: 20,
    borderRadius: 15,
    color: 'white',
  },
  avatar: {
    backgroundColor: 'black',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const FriendsSession = (props) => {
  const classes = useStyles();
  let sessions = useSelector((state) => state.sessions);

  if (props.friend) {
    sessions = sessions.filter((session) => session.userId === props.friend.id);
  }

  return (
    <div id="friends-stats" className={classes.contain}>
      <Avatar className={classes.avatar}>
        <FaceIcon />
      </Avatar>
      <h4>Email | {props.friend.email}</h4>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <LastSession sessions={sessions} />
        </Grid>
        <Grid item xs={7}>
          <TotalSessions sessions={sessions} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FriendsSession;
