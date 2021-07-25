import React, { createContext, useEffect, useState, useContext } from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import Timer from './Timer';
import FocusConfig from './FocusConfig';
import { connect, useDispatch, useSelector } from 'react-redux';
import { SessionContext } from '../../app';
export const TimerContext = createContext();
const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignContent: 'left',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    margin: '25px',
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentSession = useSelector((state) => state.currentSession);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { setSessionTime, sessionTime } = useContext(SessionContext);
  const sessionActive = JSON.parse(
    localStorage.getItem('sessionActive') || false
  );
  useEffect(() => {
    // before session starts
    if (!sessionActive && currentSession.status === 'Not Started') {
      const sec = seconds * 1000;
      const min = minutes * 60000;
      const hour = hours * 3600000;

      setSessionTime(sec + min + hour);
      window.localStorage.setItem('sessionTime', sec + min + hour);
    } else {
      // for ongoing session
      window.timer = setInterval(() => {
        setSessionTime((sessionTime) => {
          const newSessionTime = sessionTime - 1000;
          localStorage.setItem('sessionTime', newSessionTime);
          return newSessionTime;
        });
        if (!sessionTime || !sessionActive) {
          setSessionTime(0);
          clearInterval(window.timer);
        }
      }, 1000);
      return () => {
        clearInterval(window.timer);
      };
    }
  });
  return (
    <TimerContext.Provider
      value={{
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
      }}
    >
      <Container className={classes.main}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <FocusConfig />
          </Grid>
          <Grid item>
            <Timer />
          </Grid>
        </Grid>
      </Container>
    </TimerContext.Provider>
  );
};
export default connect(null)(CreateSession);
