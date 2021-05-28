import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

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

  const formatNumber = (number) => {
    if ((number + '').length === 1) {
      return `0${number}`;
    } else return number + '';
  };

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
  const handlePlay = () => {
    // data for session model
    const expectedEndTime = new Date(new Date().setMilliseconds(sessionTime));

    setExpected(expectedEndTime);

    // start countdown
    setCountDown(true);
    nextFunc();
  };
  const nextFunc = () => {
    if (sessionTime && countDown) {
      const timer = setInterval(() => {
        setSessionTime((sessionTime) => sessionTime - 1000);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  };
  return (
    <section className={classes.timerContainer}>
      <div className={classes.timer}>
        {sessionTime ? (
          <div>
            {formatNumber(new Date(sessionTime).getMinutes())} :{' '}
            {formatNumber(new Date(sessionTime).getSeconds())}
          </div>
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
        <Button onClick={handlePlay}>Play</Button>
        <Button>Stop</Button>
        <Button onClick={handleTime}>Set Time</Button>
      </div>
    </section>
  );
};
export default Timer;
