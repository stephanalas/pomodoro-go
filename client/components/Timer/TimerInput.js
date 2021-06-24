import React, { useContext, useState } from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
import { SessionContext } from './CreateSession';

const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
}));

const TimerInput = (props) => {
  const classes = useStyles();
  const { goal, sessionTime, setSessionTime } = useContext(SessionContext);
  const [inputError, setInputError] = useState(false);
  const [input, setInput] = useState('');
  const { label } = props;

  const hasError = (ev) => {
    const { value } = ev.target;
    setInputError(false);
    //checking for errors
    const i = parseInt(value);
    if (i + '' === 'NaN') return true;

    const hasChar = value.split('').some((item) => parseInt(item) === NaN);

    if (hasChar) return true;

    if (label === 'Hours' && i > 23) return true;

    if (i > 59) return true;

    setInput(value);

    return false;
  };
  const handleChange = (ev) => {
    const { value } = ev.target;

    if (hasError(ev)) {
      setInputError(true);

      return;
    }

    // change the session time bases on input
    if (label === 'Hours') {
      const previous = (input ? parseInt(input) : 0) * 3600000;
      const hours = parseInt(value) * 3600000;
      setSessionTime(sessionTime - previous + hours);
      window.localStorage.setItem(
        'sessionTime',
        sessionTime - previous + hours
      );
    } else if (label === 'Minutes') {
      const previous = (input ? parseInt(input) : 0) * 60000;
      const minutes = parseInt(value) * 60000;

      setSessionTime(sessionTime - previous + minutes);
      window.localStorage.setItem(
        'sessionTime',
        sessionTime - previous + minutes
      );
    } else {
      const previous = (input ? parseInt(input) : 0) * 1000;
      const seconds = parseInt(value) * 1000;

      setSessionTime(sessionTime - previous + seconds);
      window.localStorage.setItem(
        'sessionTime',
        sessionTime - previous + seconds
      );
    }
  };
  return (
    <Grid item xs={4}>
      <TextField
        label={label}
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.input}
        variant="outlined"
        placeholder="00"
        error={inputError ? true : false}
        helperText={inputError ? 'input error' : null}
        onChange={handleChange}
        disabled={goal ? false : true}
        multiline
        inputProps={{ maxLength: 2 }}
      ></TextField>
    </Grid>
  );
};

export default TimerInput;
