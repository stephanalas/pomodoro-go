import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import TimerInput from './TimerInput';
import TaskList from './TaskList';
import CreateTask from './CreateTask';
import GoalSelector from './GoalSelector';

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
  const { setGoal, goal } = props;

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
          <Typography align="center">Create Session</Typography>
        </Grid>
        <GoalSelector className={classes.goal} setGoal={setGoal} goal={goal} />
        <Grid item xs={12} className={classes.inputContainer}>
          {[['Hours'], ['Minutes'], ['Seconds']].map((label, idx) => (
            <TimerInput
              key={idx * 10}
              label={label[0]}
              sessionTime={props.sessionTime}
              setSessionTime={props.setSessionTime}
              goal={goal}
            />
          ))}
        </Grid>
        <Grid container className={classes.taskArea}>
          <CreateTask goal={goal} />
          <Grid item xs={12} className={classes.taskList}>
            <TaskList />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FocusConfig;
