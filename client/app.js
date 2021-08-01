import React, { useEffect, useState, createContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import Nav from './components/Nav';
import Routes from './routes';
import { endSession } from './store/sessions';

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
  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');
  const [intervalID, setIntervalID] = useState('');

  useEffect(() => {
    console.log('on app mount');

    const timeFromStorage = JSON.parse(localStorage.getItem('sessionTime'));
    const sessionFromStorage = JSON.parse(
      localStorage.getItem('currentSession')
    );
    console.log('sessionFromStorage', sessionFromStorage);
    console.log('timeFromStorage', timeFromStorage);
    if (sessionFromStorage?.status === 'Ongoing' && !sessionTime) {
      console.log('should end session');
      props.endSession(sessionFromStorage.id, true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!sessionTime && currentSession) {
      if (currentSession.status === 'Ongoing') {
        props.endSession(currentSession.id, true);
      }
    }
  }, [sessionTime]);

  return (
    <div className={classes.main}>
      <SessionContext.Provider
        value={{
          sessionTime,
          setSessionTime,
          goal,
          setGoal,
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
    endSession: (sessionId, successful) => {
      dispatch(endSession(sessionId, successful));
    },
  };
})(App);
