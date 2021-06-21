import React, { useEffect } from 'react';

import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
  },
}));
const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chrome.runtime) {
      chrome.storage.sync.get(['user'], (result) => {
        if (result.user) {
          console.log('user in sync', result.user);
          dispatch({ type: 'SET_AUTH', auth: result.user });
        }
      });
      chrome.runtime.sendMessage('app-starting', (response) => {
        console.log('message from chrome', response);
      });
    }
  }, [dispatch]);
  return (
    <div className={classes.main}>
      <Nav />
      <Routes />
    </div>
  );
};

export default App;
