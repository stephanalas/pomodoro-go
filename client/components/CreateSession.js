import React from 'react';
import { makeStyles, Container, Paper } from '@material-ui/core';
import Timer from './Timer';
const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    border: '1px solid red',
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    border: '1px solid red',
    height: '20rem',
    width: '40rem',
    margin: '10px',
  },
}));
const CreateSession = () => {
  const classes = useStyles();
  return (
    <Container className={classes.main}>
      <Paper className={classes.paper}>
        <Timer />
        Timer Config
      </Paper>
    </Container>
  );
};
export default CreateSession;
