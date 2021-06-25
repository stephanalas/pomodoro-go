import React, { useContext, useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from '../../app';

const useStyles = makeStyles(() => ({
  timerContainer: {
    border: '1px solid black',
    height: '50%',
    width: '25%',
    borderRadius: '30px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimeDisplay: {
    display: 'flex',
  },
}));

const Timer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  const { setCountDown, sessionTime, countDown, setSessionTime } =
    useContext(SessionContext);
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
        console.log('props', props);
      }
      localStorage.setItem('currentSession', JSON.stringify(currentSession));
      setCountDown(true);
      window.timer = setInterval(() => {
        setSessionTime((sessionTime) => {
          const newSessionTime = sessionTime - 1000;
          localStorage.setItem('sessionTime', newSessionTime);
          return newSessionTime;
        });
      }, 1000);
    }
    if (button === 'STOP' || button === 'PAUSE') {
      setCountDown(false);
      clearInterval(timer);
    }
  };
  return (
    <section className={classes.timerContainer}>
      <div className={classes.timer}>
        <div>{msToHMS(sessionTime)}</div>
      </div>
      <div className={classes.buttons}>
        {countDown ? (
          <Button onClick={toggleTimer}>pause</Button>
        ) : (
          <Button
            onClick={toggleTimer}
            className="start-button"
            disabled={sessionTime ? false : true}
          >
            Start
          </Button>
        )}
        {countDown ? <StopButton toggleTimer={toggleTimer} /> : null}
      </div>
    </section>
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
