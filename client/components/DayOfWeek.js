import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DayOfWeekChart from './DayOfWeekChart';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 500,
    minHeight: 500,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
});

const DayOfWeek = () => {
  const classes = useStyles();
  //useSelector allows this component to access state
  const sessions = useSelector((state) => state.sessions);

  return (
    <Paper className={classes.contain}>
      {/* <Typography className={classes.lsItem} variant="h5" color="primary">
        Day of Week
      </Typography> */}
      <DayOfWeekChart />
    </Paper>
  );
};

export default DayOfWeek;
