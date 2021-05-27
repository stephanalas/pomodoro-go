import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  timer: {
    border: '1px solid black',
    alignSelf: 'center',
  },
}));
const Timer = () => {
  const classes = useStyles();
  return <div className={classes.timer}>Hello</div>;
};
export default Timer;
