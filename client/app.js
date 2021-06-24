import React, { useEffect, useState } from 'react';

import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e4ddee',
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Nav />
      <Routes />
    </div>
  );
};

export default App;
