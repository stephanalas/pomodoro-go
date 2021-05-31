import React, { useState } from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
}));

const TimerInput = (props) => {
  const classes = useStyles();
  const [inputError, setInputError] = useState(false);

  const hasError = (ev) => {
    setInputError(false);
    //checking for errors
    const input = parseInt(ev.target.value);
    if (input + '' === 'NaN') return true;

    const hasChar = ev.target.value
      .split('')
      .some((item) => parseInt(item) === NaN);
    console.log(hasChar);
    if (props.label === 'Hours') {
      return input > 24 || input < 0 || hasChar ? true : false;
    }
    return input > 60 || input < 0 || hasChar ? true : false;
  };

  const handleChange = (ev) => {
    if (hasError(ev)) {
      setInputError(true);
      return;
    }
    // change the session time bases on input
    if (props.label.toLowerCase() === 'hours') {
      props.setSessionTime(ev.target.value * 3600000);
    } else if (props.label.toLowerCase() === 'minutes') {
      props.setSessionTime(ev.target.value * 60000);
    } else props.setSessionTime(ev.target.value * 1000);
  };
  return (
    <Grid item xs={4}>
      <TextField
        label={props.label}
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.input}
        variant="outlined"
        placeholder="00"
        error={inputError ? true : false}
        helperText={inputError ? 'input error' : null}
        onChange={handleChange}
        disabled={props.goal ? false : true}
      ></TextField>
    </Grid>
  );
};

export default TimerInput;
