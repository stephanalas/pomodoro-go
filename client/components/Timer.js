import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import TimeDisplay from './TimeDisplay';

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
  // the value for timer will come from the timer config component
  const [countDown, setCountDown] = useState(false);
  const classes = useStyles();
  const {
    setHours,
    setMinutes,
    setSeconds,
    seconds,
    minutes,
    hours,
    sessionTime,
    setSessionTime,
    setExpected,
  } = props;
  const handleTime = () => {
    const timerSeconds = seconds * 1000;
    const timerMinutes = minutes * 60000;
    const timerHours = hours * 60000 * 60;

    setSessionTime(timerHours + timerMinutes + timerSeconds);
  };
  const handlePlay = (ev) => {
    // data for session model
    const expectedEndTime = new Date(new Date().setMilliseconds(sessionTime));
    console.log(expectedEndTime);
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
        {/* {props.sessionTime ? (
          <div>{msToHMS(props.sessionTime)}</div>
        ) : (
          <div className={classes.TimeDisplay}>
            {[
              [hours, setHours, 'Hours'],
              [minutes, setMinutes, 'Minutes'],
              [seconds, setSeconds, 'Seconds'],
            ].map((section) => (
              <TimeDisplay
                time={section[0]}
                setTime={section[1]}
                label={section[2]}
              />
            ))} */}
        <div>{msToHMS(props.sessionTime)}</div>
      </div>
      <div className={classes.buttons}>
        {countDown ? (
          <Button onClick={handlePause}>pause</Button>
        ) : (
          <Button onClick={handlePlay} disabled={sessionTime ? false : true}>
            Play
          </Button>
        )}
        {sessionTime ? <Button onClick={toggleTimer}>stop</Button> : null}
        {/* <Button onClick={handleTime}>Set Time</Button> */}
      </div>
    </section>
  );
};
export default Timer;
