import React, { createContext, useState } from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import Timer from './Timer';
import FocusConfig from './FocusConfig';
import { connect, useSelector } from 'react-redux';
import { loadSession } from '../../store/sessions';
const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
    margin: '25px'
  },
  paper: {
    display: 'flex',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    margin: '25px',
  },
}));
const CreateSession = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.main}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item >
          <FocusConfig />
        </Grid>
        <Grid item >
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
