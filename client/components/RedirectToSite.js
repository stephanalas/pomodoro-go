import { Link, makeStyles, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4ddee',
    height: '100%',
    width: '100%',
  },
  text: {
    color: '#4d2a4e',
  },
}));

const RedirectToSite = () => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <a href="http://localhost:8080">
        <Button className={classes.text}>
          Click to navigate to site www.pomodoro.go
        </Button>
      </a>
    </div>
  );
};

export default RedirectToSite;
