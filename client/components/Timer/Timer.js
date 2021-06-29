import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Typography,
  makeStyles,
  Card,
  Grid,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from '../../app';
import { Circle } from 'rc-progress';

const useStyles = makeStyles(() => ({
  timerContainer: {
    // border: '1px solid #b49b8f',
    boxShadow: '0 3px 5px 2px #b49b8f',
    borderRadius: '15px',
    backgroundColor: 'white',
    minHeight: '200px',
    // display: 'flex',
    // flexBasis:'40%',
    minWidth: '800px',
    margin: '10px',
    // flexFlow: 'column',
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  timer: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  TimeDisplay: {
    // display: 'flex',
  },
  timerBig: {
    fontSize: '200px',
    // display: 'flex',
    // flexBasis:'40%',
    // width:'100%',
    margin: '10px',
    // flexFlow: 'column',
    // justifyContent: 'center',
    // alignContent: 'center',
  },
}));

const Timer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  console.log('theme:', theme);
  const {info, primary, secondary, text, error} = theme.palette;
  console.log('info:', info);
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  console.log('currentSession:', currentSession)
  const { setCountDown, sessionTime, countDown, setSessionTime } =
    useContext(SessionContext);
  const { updateSession } = props;
  let seconds;
  const msToHMS = (ms) => {
    seconds = ms / 1000;

    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;

    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? (seconds >= 0 ? '0' + seconds : '00') : seconds;
    //Ding:I added seconds>=0? '0' + seconds:'00'
    //But the play button may also need to be modified...

    return hours + ':' + minutes + ':' + seconds;
  };

  const msToS = (ms) => {
    seconds = ms / 1000;
    seconds = seconds % 3600;
    seconds = seconds % 60;
    seconds = seconds < 10 ? (seconds >= 0 ? '0' + seconds : '00') : seconds;
    console.log('seconds:', seconds)
    if (seconds === '00') {
      return 100;
    } else {
    return ((seconds)/60)*100;
    }
  };

  const toggleTimer = (ev) => {
    const button = ev.target.innerText;
    if (button === 'START') {
      if (!currentSession.sessionTime) {
        updateSession(currentSession.id, { sessionTime });
        console.log('props', props);
      }
      localStorage.setItem('currentSession', JSON.stringify(currentSession));
      setCountDown(true);
      window.timer = setInterval(() => {
        setSessionTime((sessionTime) => {
          const newSessionTime = sessionTime - 1000;
          localStorage.setItem('sessionTime', newSessionTime);
          return newSessionTime;
        });
      }, 1000);
    }
    if (button === 'STOP' || button === 'PAUSE') {
      setCountDown(false);
      clearInterval(timer);
    }
  };
  const setChromeStorageTimer = () => {};
  return (
    <div>
      <Card className={classes.timerContainer} elevation={10}>
        {/* <div className={classes.timer}>
      </div> */}
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h1" className={classes.timerBig}>
              {msToHMS(sessionTime)}{' '}
            </Typography>
          </Grid>
          <div className={classes.buttons}>
            {countDown ? (
              <Button
                onClick={toggleTimer}
                style={{
                  backgroundColor: '#9a6781',
                  color: 'white',
                  marginLeft: '4px',
                  marginBottom: '10px',
                }}
              >
                pause
              </Button>
            ) : (
              <Button
                onClick={toggleTimer}
                disabled={sessionTime ? false : true}
                style={{
                  backgroundColor: '#9a6781',
                  color: 'white',
                  marginLeft: '4px',
                  marginBottom: '10px',
                  zIndex: 1
                }}
              >
                Start
              </Button>
            )}
            {countDown ? <StopButton toggleTimer={toggleTimer} /> : null}
          </div>
        </Grid>
        <Circle percent={msToS(sessionTime)} strokeWidth="3" strokeColor={{
          '0%': info.main,
          '100%': text.primary,
        }}
        trailColor='#e4ddee'
        style={{
          position: 'relative',
          bottom: '250px'
        }}/>
      </Card>

    </div>
  );
};
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateSession: (sessionId, sessionTime) =>
        dispatch(updateSession(sessionId, sessionTime)),
    };
  }
)(Timer);
