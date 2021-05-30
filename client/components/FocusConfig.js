import React from 'react';
import {
  Grid,
  Input,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import TimerInput from './TimerInput';
import TaskList from './TaskList';
import CreateTask from './CreateTask';

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

const FocusConfig = () => {
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
        <Grid container item className={classes.goal}>
          <Typography>Select Goal</Typography>
          <Select>
            <MenuItem>Study</MenuItem>
            <MenuItem>Meditate</MenuItem>
            <MenuItem>Work</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          {[['Hours'], ['Minutes'], ['Seconds']].map((label) => (
            <TimerInput label={label[0]} />
          ))}
        </Grid>
        <Grid container className={classes.taskArea}>
          <CreateTask />
          <Grid item xs={12} className={classes.taskList}>
            <TaskList />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FocusConfig;
