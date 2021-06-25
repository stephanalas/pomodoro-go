import React, { useContext, useEffect, useState } from 'react';
import { Button, Paper, makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from './CreateSession';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const useStyles = makeStyles(() => ({
  timerContainer: {
    border: '1px solid #b49b8f',
    boxShadow: '0 3px 5px 2px #b49b8f',
    borderRadius: '15px',
    backgroundColor: 'white',
    height: '800px',
    display: 'flex',
    flexBasis:'40%',
    width:'50%',
    margin: '10px',
    flexFlow: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundImage: 'http://localhost:8080/public/S4_Research.jpg'
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimeDisplay: {
    display: 'flex',
  }
}));

const Timer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [storageSessionTime, setStorageSessionTime] = useState(0);
  const currentSession = useSelector((state) => state.currentSession);
  const { setCountDown, sessionTime, countDown, setSessionTime } =
    useContext(SessionContext);
  const { updateSession } = props;

  useEffect(() => {
    if (sessionTime >= 0) {
      localStorage.setItem('sessionTime', sessionTime);
      if (chrome.storage) chrome.storage.local.set({ sessionTime });
    }
  });
  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get(['sessionTime'], (results) => {
        setStorageSessionTime(results.sessionTime);
        console.log('from timer: ', results);
      });
    }
  });
  useEffect(() => {
    console.log('on mount of timer', localStorage.getItem('sessionTime'));
  }, [dispatch]);
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
    sendSessionToChrome();
  };
  const setChromeStorageTimer = () => {};
  const sendSessionToChrome = () => {
    if (chrome.storage) {
      chrome.storage.local.set({ currentSession });
    }
  };
  return (
    <Paper className={classes.timerContainer} elevation={10}>
      <div className={classes.timer}>
        <div>{msToHMS(sessionTime)}</div>
      </div>
      <div className={classes.buttons}>
        {countDown ? (
          <Button onClick={toggleTimer} style={{
            backgroundColor: '#9a6781',
            color: 'white',
            marginLeft:'4px'
          }}>pause</Button>
        ) : (
          <Button onClick={toggleTimer} disabled={sessionTime ? false : true} style={{
            backgroundColor: '#9a6781',
            color: 'white',
            marginLeft:'4px'
          }}>
            Play
          </Button>
        )}
        {countDown ? <StopButton toggleTimer={toggleTimer} /> : null}
      </div>
      <CountdownCircleTimer
        isPlaying={countDown ? true : false}
        duration={sessionTime}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
      >
        {({ remainingTime }) => msToHMS(sessionTime)}
      </CountdownCircleTimer>
    </Paper>
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
