import React, { useEffect, useState, createContext } from 'react';

import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { me } from './store';
import { endSession, loadSession, removeSession } from './store/sessions';
export const SessionContext = createContext();

const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
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
  const [intervalID, setIntervalID] = useState('');

  useEffect(() => {
    const timeLeft = localStorage.getItem('sessionTime');
    if (parseInt(timeLeft) < 0) return;

    if (!parseInt(timeLeft) && currentSession.id && countDown) {
      props.endSession(currentSession.id, true);
    }
  }, [sessionTime]);

  useEffect(() => {
    const timeFromStorage = JSON.parse(localStorage.getItem('currentSession'));
    const sessionFromStorage = JSON.parse(
      localStorage.getItem('currentSession')
    );
    const sessionActive = JSON.parse(localStorage.getItem('sessionActive'));
    if (timeFromStorage <= 0 && sessionActive) {
      props.endSession(sessionFromStorage.id, true);
      localStorage.setItem('sessionActive', false);
    }
    // console.log('from app', sessionFromLocalStorage);
    // if (sessionFromLocalStorage) {
    //   dispatch(loadSession(sessionFromLocalStorage.id));
    // }
    // if ((sessionTime, countDown)) {
    //   const id = setInterval(() => {
    //     setSessionTime((sessionTime) => {
    //       localStorage.setItem('sessionTime', sessionTime - 1000);
    //       return sessionTime - 1000;
    //     });
    //   }, 1000);
    //   setIntervalID(id);
    // }
    // if (!countDown) {
    //   clearInterval(intervalID);
    //   setSessionTime(0);
    // }
    chrome.runtime.sendMessage(
      'opechfjocpfdfihnebpmdbkajmmomihl',
      {
        message: 'get-time',
      },
      (response) => {
        console.log(response);
        localStorage.setItem('sessionTime', response.sessionTime);
        setSessionTime(response.sessionTime);
      }
    );
  }, [dispatch]);

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
          intervalID,
          setIntervalID,
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
    endSession: (sessionId, successful) =>
      dispatch(endSession(sessionId, successful)),
  };
})(App);
