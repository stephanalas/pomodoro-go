import React, { useState } from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
}));

const TimerInput = (props) => {
  const classes = useStyles();
  // timer may need local state
  const [inputError, setInputError] = useState(false);
  const [input , setInput] = useState('')

  const hasError = (ev) => {
    setInputError(false);
    //checking for errors
    const i = parseInt(ev.target.value);
    if (i + '' === 'NaN') return true;

    const hasChar = ev.target.value
      .split('')
      .some((item) => parseInt(item) === NaN);
    if (props.label === 'Hours') {
    }
    if (hasChar) return true;
    if (props.label === 'Hours' &&  i > 23) return true;
    if (i > 59) return true;
    setInput(ev.target.value)
    return false

  };
  const handleChange = (ev) => {
    if (hasError(ev)) {
      setInputError(true);
      return;
    }
    console.log(input)
    // change the session time bases on input
    if (props.label.toLowerCase() === 'hours') {
      const previous = (input ? parseInt(input) : 0) * 3600000
      const hours = parseInt(ev.target.value) * 3600000;
      props.setSessionTime((props.sessionTime - previous ) + hours );
    } else if (props.label.toLowerCase() === 'minutes') {
      const previous = (input ? parseInt(input) : 0) * 60000
      const minutes = parseInt(ev.target.value) * 60000
      props.setSessionTime((props.sessionTime - previous) + minutes );
    } else {
      const previous = (input ? parseInt(input) : 0) * 1000

      const seconds = parseInt(ev.target.value) * 1000
      props.setSessionTime((props.sessionTime  - previous) + seconds);
    
  };
  }
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
        multiline
        inputProps={{ maxLength: 2}}

      ></TextField>
    </Grid>
  );
};

export default TimerInput;
