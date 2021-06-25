import React, { createContext, useState } from 'react';
import { makeStyles, Container,  Grid } from '@material-ui/core';
import Timer from './Timer';
import FocusConfig from './FocusConfig';
import { connect, useSelector } from 'react-redux';
import { loadSession } from '../../store/sessions';
export const SessionContext = createContext();
const useStyles = makeStyles(() => ({
  main: {
    // display: 'flex',
    // flexDirection: 'column',
    height: '100%',
    margin:'25px'
  },
  focus: {
    margin: '10px',
  },

  timer: {
    margin: '10px'
  }
}));
const CreateSession = (props) => {
  const classes = useStyles();
  const currentSession = useSelector((state) => state.currentSession);
  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');
  const [countDown, setCountDown] = useState(false);

  return (
    <SessionContext.Provider
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
        <Grid container justify="center" >
          <Grid item className={classes.focus}>
            <FocusConfig />
          </Grid>
          <Grid item className={classes.timer}>
            <Timer />
          </Grid>
        </Grid>
      </Container>
    </SessionContext.Provider>
  );
};
export default connect(null, (dispatch) => {
  return {
    fetchCurrentSession: (sessionId) => dispatch(loadSession(sessionId)),
  };
})(CreateSession);
