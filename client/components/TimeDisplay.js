import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    width: '50%',
  },
  tens: {},
  ones: {},
}));

const TimeDisplay = (props) => {
  const classes = useStyles();
  const { setTime, time } = props;
  const incrementByTen = () => {
    setTime(time + 10);
  };
  const increment = () => {
    setTime(time + 1);
  };
  const decrementByTen = () => {
    setTime(time - 10);
  };
  const decrement = () => {
    setTime(time - 1);
  };
  let stringTime;
  if (time < 10) {
    stringTime = '0' + time;
  } else {
    stringTime = time;
  }
  return (
    <div className={classes.main}>
      <div className={classes.tens}>
        <Button>+</Button>
        <Typography align="center">{stringTime[0]}</Typography>
        <Button>-</Button>
      </div>
      <div className={classes.ones}>
        <Button>+</Button>
        <Typography align="center">{stringTime[1]}</Typography>
        <Button>-</Button>
      </div>
    </div>
  );
};

export default TimeDisplay;
