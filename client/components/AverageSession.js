import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    maxWidth: 300,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
});

const AverageSession = () => {
  const classes = useStyles();
  const sessions = useSelector((state) => state.sessions);

  let totalExpectedSessionLength;
  if (sessions.length) {
    totalExpectedSessionLength = sessions.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }

  const avgExpectedSessionLength = totalExpectedSessionLength / sessions.length;
  const avgExpectedSessionMinutes = parseInt(avgExpectedSessionLength);

  let totalActualSessionLength;
  if (sessions.length) {
    totalActualSessionLength = sessions.reduce((total, session) => {
      const actualEndTime = dayjs(session.actualEndTime);
      const startTime = dayjs(session.startTime);
      const actualSessionLength = actualEndTime - startTime;

      total += actualSessionLength;
      return total;
    }, 0);
  }

  const avgSessionLength = totalActualSessionLength / sessions.length;
  const avgSessionMinutes = parseInt(avgSessionLength / 60000);

  let totalSuccessful = [];
  let totalFailed = [];

  if (sessions.length) {
    totalSuccessful = sessions.filter((session) => {
      return session.successful === true;
    });
    totalFailed = sessions.filter((session) => {
      return session.successful === false;
    });
  }

  return (
    <Paper className={classes.contain}>
      <Typography className={classes.lsItem} variant="h5" color="primary">
        Average Session
      </Typography>
      <Grid container direction="column">
        <Grid item className={classes.lsItem} xs={4}>
          <Typography variant="caption" color="textSecondary">
            Actual
          </Typography>
          <Typography variant="h5">
            {sessions.length ? `${avgSessionMinutes}min` : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.lsItem} xs={4}>
          <Typography variant="caption" color="textSecondary">
            Expected
          </Typography>
          <Typography variant="h5">
            {sessions.length ? `${avgExpectedSessionMinutes}min` : ''}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AverageSession;
