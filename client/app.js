import React from 'react';

import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
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
