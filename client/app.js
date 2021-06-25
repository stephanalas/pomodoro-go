import React, { useEffect, useState, createContext } from 'react';

import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { me } from './store';
export const SessionContext = createContext();

const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e4ddee',
  },
}));
const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  const auth = useSelector((state) => state.auth);
  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');
  const [countDown, setCountDown] = useState(false);
  useEffect(() => {
    // setPort(PORT);
    const sT = window.localStorage.getItem('sessionTime');
    if (parseInt(sT)) {
      // setSessionTime((sessionTime) => {
      //   const newSessionTime = sessionTime - 1000;
      //   localStorage.setItem('sessionTime', newSessionTime);
      //   return newSessionTime;
      // });
    }
    if (!parseInt(sT)) {
      if (window.timer) window.localStorage.setItem('timerDone', true);
      console.log('timer is over');
      clearInterval(window.timer);

      window.localStorage.setItem('sessionTime', 0);
    }
    if (
      window.localStorage.getItem('timerDone') === 'true' &&
      localStorage.getItem('currentSession') !== 'null'
    ) {
      console.log('timer done is true');
      chrome.runtime.sendMessage('jgphbioennmnjogfbpchcgphelmfoiig', {
        message: 'timer-done',
      });
      window.localStorage.setItem('currentSession', null);
      window.localStorage.removeItem('timerDone');
    }
    console.log('app is refreshing');
  });
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(me());
    }
  }, [dispatch]);
  return (
    <div className={classes.main}>
      <SessionContext.Provider
        value={{
          sessionTime,
          setSessionTime,
          goal,
          setGoal,
          countDown,
          setCountDown,
        }}
      >
        <Nav />
        <Routes />
      </SessionContext.Provider>
    </div>
  );
};

export default App;
