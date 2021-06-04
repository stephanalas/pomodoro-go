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

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
<<<<<<< Updated upstream
    minHeight: 272,
=======
    minHeight: 250,
>>>>>>> Stashed changes
    // maxWidth: 300,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
  failed: {
    padding: 8,
    marginTop: 26,
  },
});

<<<<<<< Updated upstream
const AverageSession = (props) => {
  const classes = useStyles();
  // const sessions = useSelector((state) => state.sessions);
  const { sessions } = props;
=======
const AverageSession = () => {
  const classes = useStyles();
  const sessions = useSelector((state) => state.sessions);

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

      return total;
    }, 0);
  }
=======
      return total;
    }, 0);
  }

>>>>>>> Stashed changes
  const avgSessionLength = totalActualSessionLength / sessions.length;
  const avgSessionMinutes = parseInt(avgSessionLength / 60000);

  let sessionsSuccessful = [];
  let sessionsFailed = [];

  if (sessions.length) {
    sessionsSuccessful = sessions.filter((session) => {
      return session.successful === true;
    });
    sessionsFailed = sessions.filter((session) => {
      return session.successful === false;
    });
  }

  //Average Expected Length of Successful Sessions

  let totalSuccessfulExpSessionLength;
  if (sessions.length) {
    totalSuccessfulExpSessionLength = sessionsSuccessful.reduce(
      (total, session) => {
        total += session.sessionTime;
        return total;
      },
      0
    );
  }

  const avgSuccessfulExpSessionLength =
    totalSuccessfulExpSessionLength / sessionsSuccessful.length;
  const avgSuccessfulExpSessionMinutes = parseInt(
    Math.round(avgSuccessfulExpSessionLength)
  );

  //Average Actual Length of Successful Sessions

  let totalSuccessfulSessionLength;
  if (sessions.length) {
    totalSuccessfulSessionLength = sessionsSuccessful.reduce(
      (total, session) => {
        const actualEndTime = dayjs(session.actualEndTime);
        const startTime = dayjs(session.startTime);
        const actualSessionLength = actualEndTime - startTime;

        total += actualSessionLength;
        return total;
      },
      0
    );
  }

  const avgSuccessfulSessionLength =
    totalSuccessfulSessionLength / sessionsSuccessful.length;
<<<<<<< Updated upstream
  const avgSuccessfulSessionMinutes = Math.round(
    avgSuccessfulSessionLength / 60000
=======
  const avgSuccessfulSessionMinutes = parseInt(
    Math.round(totalSuccessfulSessionLength / 60000 / 200)
>>>>>>> Stashed changes
  );

  //Average Expected Length of Failed Sessions

  let totalFailedExpSessionLength;
  if (sessions.length) {
    totalFailedExpSessionLength = sessionsFailed.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }

  const avgFailedExpSessionLength =
    totalFailedExpSessionLength / sessionsFailed.length;
<<<<<<< Updated upstream
  const avgFailedExpSessionMinutes = parseInt(
    Math.round(avgFailedExpSessionLength)
  );
=======
  console.log(avgFailedExpSessionLength);
  const avgFailedExpSessionMinutes = parseInt(
    Math.round(avgFailedExpSessionLength)
  );
  console.log(avgFailedExpSessionMinutes);
>>>>>>> Stashed changes
  //Average Actual Length of Failed Sessions

  let totalFailedSessionLength;
  if (sessions.length) {
    totalFailedSessionLength = sessionsFailed.reduce((total, session) => {
      const actualEndTime = dayjs(session.actualEndTime);
      const startTime = dayjs(session.startTime);
      const actualSessionLength = actualEndTime - startTime;

      total += actualSessionLength;
      return total;
    }, 0);
  }

  const avgFailedSessionLength =
    totalFailedSessionLength / sessionsFailed.length;
<<<<<<< Updated upstream

  const avgFailedSessionMinutes = Math.round(avgFailedSessionLength / 60000);
=======
  const avgFailedSessionMinutes = parseInt(
    Math.round(totalFailedSessionLength / 60000 / 200)
  );
>>>>>>> Stashed changes

  return (
    <Paper className={classes.contain}>
      <Typography className={classes.lsItem} variant="h5" color="primary">
        Average Session
      </Typography>
      <Grid container direction="row">
        <Grid container item direction="column" xs={4}>
          <Grid item>
            <Typography
              className={classes.lsItem}
              variant="body1"
              color="primary"
            >
              Successful
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.failed}
              variant="body1"
              color="primary"
            >
              Failed
            </Typography>
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4}>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Expected
            </Typography>
            <Typography variant="h5">
              {sessions.length ? `${avgSuccessfulExpSessionMinutes}min` : ''}
            </Typography>
          </Grid>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Expected
            </Typography>
            <Typography variant="h5">
              {sessions.length ? `${avgFailedExpSessionMinutes}min` : ''}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4}>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Actual
            </Typography>
            <Typography variant="h5">
<<<<<<< Updated upstream
              {sessions.length ? `${avgSuccessfulSessionMinutes}min` : ''}
=======
              {sessions.length ? `${avgSessionMinutes}min` : ''}
>>>>>>> Stashed changes
            </Typography>
          </Grid>

          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Actual
            </Typography>
            <Typography variant="h5">
              {sessions.length ? `${avgFailedSessionMinutes}min` : ''}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AverageSession;
