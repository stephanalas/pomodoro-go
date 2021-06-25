import React, { createContext, useState } from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import Timer from './Timer';
import FocusConfig from './FocusConfig';
import { connect, useSelector } from 'react-redux';
import { loadSession } from '../../store/sessions';
const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignContent: 'left',
    justifyContent: 'center',
    // border: '1px solid red',
    height: '100%',
    width: '100%',
  },
  paper: {
    display: 'flex',
    alignContent: 'center',
    // border: '1px solid red',
    width: '100%',
    height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    height: '100%',
    margin: '25px',
  },
  focus: {
    margin: '10px',
  },

  timer: {
    margin: '10px',
  },
}));
const CreateSession = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.main}>
      <Grid container justify="center">
        <Grid item className={classes.focus}>
          <FocusConfig />
        </Grid>
        <Grid item className={classes.timer}>
          <Timer />
        </Grid>
      </Grid>
    </Container>
  );
};
export default connect(null, (dispatch) => {
  return {
    fetchCurrentSession: (sessionId) => dispatch(loadSession(sessionId)),
  };
})(CreateSession);
