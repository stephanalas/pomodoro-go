import { Button, ListItem, Checkbox, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../store/sessions';

const useStyles = makeStyles(() => ({
  task: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
}));
const Task = (props) => {
  const { task } = props;
  const { name, id } = task;
  const classes = useStyles();
  const handleClick = () => {
    props.deleteTask(id, props.currentSession.id);
  };
  return (
    <ListItem key={id} className={classes.task}>
      <Button onClick={handleClick}>X</Button>
      {name} <Checkbox>Completed</Checkbox>
    </ListItem>
  );
};

export default connect(
  ({ currentSession }) => ({ currentSession }),
  (dispatch) => {
    return {
      deleteTask: (taskId, sessionId) =>
        dispatch(deleteTask(taskId, sessionId)),
    };
  }
)(Task);
