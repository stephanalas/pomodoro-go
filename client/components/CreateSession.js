import React, { useState } from 'react';
import { makeStyles, Container, Paper } from '@material-ui/core';
import Timer from './Timer';
import FocusConfig from './FocusConfig';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    // border: '1px solid red',
    height: '100%',
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    // border: '1px solid red',
    margin: '10px',
    height: '100%',
  },
}));
const CreateSession = () => {
  const classes = useStyles();

  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');

  return (
    <Container className={classes.main}>
      <Paper className={classes.paper}>
        <Timer sessionTime={sessionTime} setSessionTime={setSessionTime} />
        <FocusConfig
          goal={goal}
          setGoal={setGoal}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
        />
      </Paper>
    </Container>
  );
};
export default CreateSession;
