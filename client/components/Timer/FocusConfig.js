import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import TimerInput from './TimerInput';
import GoalSelector from './GoalSelector';

import { SessionContext } from '../../app';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '50%',
      height: '100%',
      border: '1px solid black',
      borderRadius: '10px',
      justifyContent: 'space-around',
    },
    goal: {
      padding: '1rem',
      margin: '1rem',
      display: 'flex',
      justifyContent: 'space-around',
    },

    gridInput: {
      width: '30%',
    },
    gridContainer: {
      margin: '0',
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
    },
    inputContainer: {
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-around',
    },
    taskArea: {
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
    },
    taskList: {
      height: '100%',
    },
  };
});

const FocusConfig = (props) => {
  const currentSession = useSelector((state) => state.currentSession);
  const { goal } = useContext(SessionContext);
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid
        justify="center"
        item
        container
        xs={12}
        spacing={2}
        className={classes.gridContainer}
      >
        <Grid item>
          {currentSession.status !== 'Ongoing' ? (
            <Typography align="center">Create Session</Typography>
          ) : (
            <Typography>Current Session</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {currentSession.status !== 'Ongoing' ? (
            <GoalSelector className={classes.goal} />
          ) : (
            <Typography>Goal : {goal}</Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: currentSession.status === 'Ongoing' ? 'none' : null,
          }}
          className={classes.inputContainer}
        >
          {[['Hours'], ['Minutes'], ['Seconds']].map((label, idx) => (
            <TimerInput key={idx * 10} label={label[0]} />
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default connect(({ currentSession }) => ({ currentSession }))(
  FocusConfig
);
