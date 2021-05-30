import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
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
const CreateTask = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        placeholder="Create a task"
        variant="outlined"
      />
      <Button className={classes.button}>Add Task</Button>
    </div>
  );
};

export default CreateTask;
