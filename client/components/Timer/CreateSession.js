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
  const classes = useStyles();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { setSessionTime, sessionTime } = useContext(SessionContext);
  return (
    <TimerContext.Provider
      value={{
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        setSessionTime,
        sessionTime,
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
