import React, { useState } from 'react';
import { makeStyles, Container, Paper } from '@material-ui/core';
import Timer from './Timer';
import FocusConfig from './FocusConfig';
const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    border: '1px solid red',
    height: '100%',
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    border: '1px solid red',
    margin: '10px',
    height: '100%',
  },
}));
const CreateSession = () => {
  const classes = useStyles();

  const [sessionTime, setSessionTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expectedEndTime, setExpected] = useState({});
  const [goal, setGoal] = useState('');

  // might need this function later on
  // const handleTime = () => {
  //   const timerSeconds = seconds * 1000;
  //   const timerMinutes = minutes * 60000;
  //   const timerHours = hours * 60000 * 60;

  //   setSessionTime(timerHours + timerMinutes + timerSeconds);
  // };
  return (
    <Container className={classes.main}>
      <Paper className={classes.paper}>
        <Timer
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          setExpected={setExpected}
          // handleTime={handleTime}
        />
        <FocusConfig
          goal={goal}
          setGoal={setGoal}
          handleTime={handleTime}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
        />
      </Paper>
    </Container>
  );
};
export default CreateSession;
