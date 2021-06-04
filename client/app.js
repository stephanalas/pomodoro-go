import React from 'react';
<<<<<<< Updated upstream

import Navbar from './components/Navbar';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
=======
import Navbar from './components/Navbar';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';

>>>>>>> Stashed changes
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
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
