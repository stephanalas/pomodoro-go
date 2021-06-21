import React, { createContext, useState, useEffect, useRef } from 'react';
import { makeStyles, Container, Paper } from '@material-ui/core';
import Timer from './Timer';
import FocusConfig from './FocusConfig';
import { connect, useSelector } from 'react-redux';
import { loadSession } from '../../store/sessions';
export const SessionContext = createContext();

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    // border: '1px solid red',
    height: '100%',
    width: '40rem',
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    // border: '1px solid red',
    margin: '10px',
    width: '40rem',
    height: '100%',
  },
}));
const CreateSession = (props) => {
  const classes = useStyles();
  const currentSession = useSelector((state) => state.currentSession);
  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');
  const [countDown, setCountDown] = useState(false);

  return (
    <SessionContext.Provider
      value={{ goal, setGoal, sessionTime, setSessionTime }}
      value={{
        sessionTime,
        setSessionTime,
        goal,
        setGoal,
        countDown,
        setCountDown,
      }}
    >
      <Container className={classes.main}>
        <Paper className={classes.paper}>
          <Timer />
          <FocusConfig />
        </Paper>
      </Container>
    </SessionContext.Provider>
  );
};
export default connect(null, (dispatch) => {
  return {
    fetchCurrentSession: (sessionId) => dispatch(loadSession(sessionId)),
  };
})(CreateSession);
