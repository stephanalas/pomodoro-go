import React from 'react';
<<<<<<< Updated upstream
=======
import { useSelector } from 'react-redux';
>>>>>>> Stashed changes
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
<<<<<<< Updated upstream
import TotalDonut from './TotalDonut';
=======
>>>>>>> Stashed changes

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    minHeight: 250,
<<<<<<< Updated upstream
    // maxHeight: 250,
=======
>>>>>>> Stashed changes
    // maxWidth: 300,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
});

<<<<<<< Updated upstream
const TotalSessions = (props) => {
  const classes = useStyles();
  // const sessions = useSelector((state) => state.sessions);

  const { sessions } = props;
  let totalExpectedSessionLength;
  if (sessions.length) {
    totalExpectedSessionLength = sessions.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }
=======
const TotalSessions = () => {
  const classes = useStyles();
  const sessions = useSelector((state) => state.sessions);
>>>>>>> Stashed changes

  let total;
  if (sessions.length) {
    total = sessions.length;
  }

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
        Total Sessions
      </Typography>
      <Grid container>
<<<<<<< Updated upstream
        <Grid container item direction="column" xs={6}>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Total Sessions
            </Typography>
            <Typography variant="h5">
              {sessions.length ? sessions.length : ''}
            </Typography>
          </Grid>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Successful
            </Typography>
            <Typography variant="h5">
              {sessions.length ? totalSuccessful.length : ''}
            </Typography>
          </Grid>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Failed
            </Typography>
            <Typography variant="h5">
              {' '}
              {sessions.length ? totalFailed.length : ''}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TotalDonut sessions={sessions} />
=======
        <Grid item className={classes.lsItem} xs={4}>
          <Typography variant="caption" color="textSecondary">
            Total Sessions
          </Typography>
          <Typography variant="h5">
            {sessions.length ? sessions.length : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.lsItem} xs={4}>
          <Typography variant="caption" color="textSecondary">
            Successful
          </Typography>
          <Typography variant="h5">
            {sessions.length ? totalSuccessful.length : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.lsItem} xs={4}>
          <Typography variant="caption" color="textSecondary">
            Failed
          </Typography>
          <Typography variant="h5">
            {' '}
            {sessions.length ? totalFailed.length : ''}
          </Typography>
>>>>>>> Stashed changes
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TotalSessions;
