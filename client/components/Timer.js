import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

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
    sessionTime,
    setSessionTime,
  } = props;
  const handlePlay = (ev) => {
    // handlePlay 'starts' the session but does not create the session.
    // the session gets created when a goal is selected. Then a user will be able to input the session time and create task to complete
    // handlePlay would just update the  and should enable the block site feature

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
        {sessionTime ? <Button onClick={toggleTimer}>stop</Button> : null}
      </div>
    </section>
  );
};
export default Timer;
