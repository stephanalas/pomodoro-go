import React, { useEffect, useState, createContext } from 'react';

import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { me } from './store';
import { endSession, removeSession } from './store/sessions';
export const SessionContext = createContext();

const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e4ddee',
  },
}));
const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  const auth = useSelector((state) => state.auth);
  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');
  const [countDown, setCountDown] = useState(false);

  useEffect(() => {
    if (!sessionTime) {
      setCountDown(false);
    }

    const sT = window.localStorage.getItem('sessionTime');

    if (!parseInt(sT) && localStorage.getItem('currentSession') !== 'null') {
      if (window.timer && !sessionTime) {
        localStorage.setItem('timerDone', true);
        console.log('timer is over');
        clearInterval(window.timer);
      }
      localStorage.setItem('sessionTime', 0);
    }

    if (
      localStorage.getItem('timerDone') === 'true' &&
      localStorage.getItem('currentSession') !== 'null' &&
      localStorage.getItem('sessionIsSet') === 'true'
    ) {
      console.log('checkout out the goal', goal);
      props.endSession(currentSession.id, true);
      chrome.runtime.sendMessage('jgphbioennmnjogfbpchcgphelmfoiig', {
        message: 'timer-done',
      });
      localStorage.setItem('currentSession', null);
      localStorage.setItem('timerDone', false);
      localStorage.setItem('sessionIsSet', false);
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

export default connect(null, (dispatch) => {
  return {
    endSession: (sessionId, status) => dispatch(endSession(sessionId, status)),
  };
})(App);
