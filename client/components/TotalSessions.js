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

const TotalSessions = () => {
  const classes = useStyles();
  //useSelector allows this component to access state
  const sessions = useSelector((state) => state.sessions);

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
    </Paper>
  );
};

export default TotalSessions;
