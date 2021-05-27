import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    maxWidth: 500,
    flexGrow: 1,
  },
});

const LastSession = () => {
  const classes = useStyles();
  const sessions = useSelector((state) => state.sessions);

  let lastSession;
  if (sessions.length) {
    lastSession = sessions[sessions.length - 1];
  }
  console.log(sessions);
  let startHour;
  let startMinute;
  let expectedEndHour;
  let expectedEndMinute;
  if (lastSession) {
    const startTime = new Date(lastSession.startTime);
    startHour = startTime.getHours();
    startMinute = startTime.getMinutes();
    const expectedEndTime = new Date(lastSession.expectedEndTime);
    expectedEndHour = expectedEndTime.getHours();
    console.log(expectedEndHour);
    expectedEndMinute = expectedEndTime.getMinutes();
  }

  return (
    <Paper className={classes.contain}>
      <Typography variant="h5">Last Session</Typography>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="caption" color="textSecondary">
            Length
          </Typography>
          <Typography variant="h5">
            {lastSession ? `${lastSession.sessionTime}min` : ''}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="textSecondary">
            Start Time
          </Typography>
          <Typography variant="h5">
            {lastSession ? `${startHour}:${startMinute}` : ''}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="textSecondary">
            Expected End Time
          </Typography>
          <Typography variant="h5">
            {' '}
            {lastSession ? `${expectedEndHour}:${expectedEndMinute}` : ''}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="textSecondary">
            Actual End Time
          </Typography>
          <Typography variant="h5">12:42 pm</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="textSecondary">
            Successful
          </Typography>
          <Typography variant="h5">Yes</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LastSession;
