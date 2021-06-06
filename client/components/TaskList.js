import React, { useState } from 'react';
import { makeStyles, List } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  paper: {
    border: 'solid 1px black',
    height: '50%',
  },
}));

const TaskList = () => {
  const classes = useStyles();
  return <List className={classes.paper}></List>;
};

export default TaskList;
