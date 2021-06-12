import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { addTask } from '../../store/sessions';
const useStyles = makeStyles(() => ({
  input: {
    width: '80%',
  },
  button: {
    width: '20%',
  },
  container: {
    height: 'max-content',
  },
}));
const CreateTask = (props) => {
  const classes = useStyles();
  const [task, setTask] = useState('');
  const { currentSession } = props;
  const handleChange = (ev) => {
    setTask(ev.target.value);
  };
  const handleClick = () => {
    if (task.length) {
      props.addTask(task, currentSession.id);
    }
  };
  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        placeholder="Create a task"
        variant="outlined"
        disabled={props.goal || !currentSession.startTime ? false : true}
        onChange={handleChange}
      />
      <Button
        className={classes.button}
        disabled={props.goal || !currentSession.startTime ? false : true}
        onClick={handleClick}
      >
        Add Task
      </Button>
    </div>
  );
};

export default connect(
  ({ currentSession }) => ({ currentSession }),
  (dispatch) => {
    return {
      addTask: (task, sessionId) => dispatch(addTask(task, sessionId)),
    };
  }
)(CreateTask);
