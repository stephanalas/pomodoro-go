import { ListItem, Checkbox } from '@material-ui/core';
import React from 'react';

const Task = (props) => {
  return (
    <ListItem>
      task name <Checkbox>Completed</Checkbox>{' '}
    </ListItem>
  );
};

export default Task;
