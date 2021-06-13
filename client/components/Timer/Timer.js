import React, { useContext, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from './CreateSession';

const useStyles = makeStyles(() => ({
  timerContainer: {
    border: '1px solid black',
    height: '100%',
    width: '50%',
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

  const currentSession = useSelector((state) => state.currentSession);
  const { setCountDown, sessionTime, countDown, setSessionTime } =
    useContext(SessionContext);
  // the value for timer will come from the timer config component
  const { updateSession } = props;
  const handlePlay = (ev) => {
    // handlePlay 'starts' the session but does not create the session.
    // the session gets created when a goal is selected. Then a user will be able to input the session time and create task to complete
    // handlePlay would just update the  and should enable the block site feature

    // this would start the session
    if (!currentSession.sessionTime) {
      updateSession(currentSession.id, { sessionTime });
    }
    // data for session model
    // start countdown
    setCountDown(true);
    toggleTimer(ev);
  };
  const handlePause = (ev) => {
    // handlePause should
    setCountDown(false);
    toggleTimer(ev);
  };
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
    if (button === 'PLAY') {
      window.timer = setInterval(() => {
        setSessionTime((sessionTime) => sessionTime - 1000);
      }, 1000);
    }
    if (button === 'STOP' || button === 'PAUSE') {
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
          <Button onClick={handlePause}>pause</Button>
        ) : (
          <Button onClick={handlePlay} disabled={sessionTime ? false : true}>
            Play
          </Button>
        )}
        {countDown ? <StopButton /> : null}
      </div>
    </section>
  );
};
export default connect(null, (dispatch) => {
  return {
    updateSession: (sessionId, sessionTime) =>
      dispatch(updateSession(sessionId, sessionTime)),
  };
})(Timer);
