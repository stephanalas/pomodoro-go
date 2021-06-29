import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Typography,
  makeStyles,
  Card,
  Grid,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from '../../app';
import { TimerContext } from './CreateSession';
const useStyles = makeStyles(() => ({
  timerContainer: {
    boxShadow: '0 3px 5px 2px #b49b8f',
    borderRadius: '15px',
    backgroundColor: 'white',
    minHeight: '200px',
    minWidth: '800px',
    margin: '10px',
  },
  timer: {},
  TimeDisplay: {},
  timerBig: {
    fontSize: '200px',
    margin: '10px',
  },
}));

const Timer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  const { setHours, setMinutes, setSeconds } = useContext(TimerContext);

  const {
    setCountDown,
    sessionTime,
    countDown,
    setSessionTime,
    intervalID,
    setIntervalID,
  } = useContext(SessionContext);
  const { updateSession } = props;

  const msToHMS = (ms) => {
    let seconds = ms / 1000;

    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;

    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? (seconds >= 0 ? '0' + seconds : '00') : seconds;
    //Ding:I added seconds>=0? '0' + seconds:'00'
    //But the play button may also need to be modified...

    return hours + ':' + minutes + ':' + seconds;
  };
  const toggleTimer = (ev) => {
    const button = ev.target.innerText;
    if (button === 'START') {
      if (!currentSession.sessionTime) {
        updateSession(currentSession.id, { sessionTime });
      }
      localStorage.setItem('currentSession', JSON.stringify(currentSession));
      setCountDown(true);
    }
    if (button === 'STOP' || button === 'PAUSE') {
      setCountDown(false);
    }
  };
  const setChromeStorageTimer = () => {};
  return (
    <div>
      <Card className={classes.timerContainer} elevation={10}>
        {/* <div className={classes.timer}>
      </div> */}
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h1" className={classes.timerBig}>
              {msToHMS(sessionTime)}{' '}
            </Typography>
          </Grid>
          <div className={classes.buttons}>
            {countDown ? (
              <Button
                onClick={toggleTimer}
                style={{
                  backgroundColor: '#9a6781',
                  color: 'white',
                  marginLeft: '4px',
                  marginBottom: '10px',
                }}
              >
                pause
              </Button>
            ) : (
              <Button
                onClick={toggleTimer}
                disabled={sessionTime && currentSession.id ? false : true}
                style={{
                  backgroundColor: '#9a6781',
                  color: 'white',
                  marginLeft: '4px',
                  marginBottom: '10px',
                }}
              >
                Start
              </Button>
            )}
            {countDown ? <StopButton toggleTimer={toggleTimer} /> : null}
          </div>
        </Grid>
        {/* <CountdownCircleTimer
        isPlaying={countDown ? true : false}
        duration={sessionTime}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
      >
        {({ remainingTime }) => msToHMS(sessionTime)}
      </CountdownCircleTimer> */}
      </Card>
      {/* <Typography color="textPrimary" className={classes.timerHuge}>{msToHMS(sessionTime)} </Typography> */}
    </div>
  );
};
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateSession: (sessionId, sessionTime) =>
        dispatch(updateSession(sessionId, sessionTime)),
    };
  }
)(Timer);
