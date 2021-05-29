import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';

const useStyles = makeStyles(() => ({
  timerContainer: {
    border: '1px solid black',
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    borderRadius: '30px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  timer: {
    alignSelf: 'center',
  },
}));
const Timer = () => {
  // the value for timer will come from the timer config component
  const [sessionTime, setSessionTime] = useState(0);
  const [expectedEndTime, setExpected] = useState({});
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [countDown, setCountDown] = useState(false);
  const classes = useStyles();

  // add minutes and seconds
  const incrementMinutes = () => {
    setMinutes(minutes + 1);
  };
  const decrementMinutes = () => {
    setMinutes(minutes - 1);
  };
  const incrementSeconds = () => {
    setSeconds(seconds + 1);
  };
  const decrementSeconds = () => {
    setSeconds(seconds - 1);
  };

  const handleTime = () => {
    const timerSeconds = seconds * 1000;
    const timerMinutes = minutes * 60000;

    setSessionTime(timerMinutes + timerSeconds);
  };
  const handlePlay = (ev) => {
    // data for session model
    const expectedEndTime = new Date(new Date().setMilliseconds(sessionTime));

    setExpected(expectedEndTime);
    // start countdown
    setCountDown(true);
    toggleTimer(ev);
  };
  const handlePause = (ev) => {
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
    seconds = seconds < 10 ? '0' + seconds : seconds;

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
      console.log('im here');
      clearInterval(timer);
    }
  };
  return (
    <section className={classes.timerContainer}>
      <div className={classes.timer}>
        {sessionTime ? (
          <div>{msToHMS(sessionTime)}</div>
        ) : (
          <div>
            <div id="minutes">
              <Button onClick={incrementMinutes}>+</Button>
              {minutes}
              <Button onClick={decrementMinutes}>-</Button>
            </div>
            <div id="seconds">
              <Button onClick={incrementSeconds}>+</Button>
              {seconds}
              <Button onClick={decrementSeconds}>-</Button>
            </div>
          </div>
        )}
      </div>
      <div className={classes.buttons}>
        {countDown ? (
          <Button onClick={handlePause}>pause</Button>
        ) : (
          <Button onClick={handlePlay}>Play</Button>
        )}
        {sessionTime ? <Button onClick={toggleTimer}>stop</Button> : null}
        <Button onClick={handleTime}>Set Time</Button>
      </div>
    </section>
  );
};
export default Timer;
