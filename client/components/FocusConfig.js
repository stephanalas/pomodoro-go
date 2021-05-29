import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '50%',
      height: '100%',
      border: '1px solid black',
      borderRadius: '10px',
    },
  };
});

const FocusConfig = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Typography>Create Session</Typography>
    </Paper>
  );
};

export default FocusConfig;
