import React from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
}));

const TimerInput = (props) => {
  const classes = useStyles();
  const getTime = () => {
    if (props.label.toLowerCase() === 'hours') {
      return props.sessionTime / 3600000;
    } else if (props.label.toLowerCase() === 'minutes') {
      return props.sessionTime / 60000;
    } else return props.sessionTime / 1000;
  };
  const handleChange = (ev) => {
    // change the session time bases on input
    if (props.label.toLowerCase() === 'hours') {
      props.setSessionTime(props.sessionTime + ev.target.value * 3600000);
    } else if (props.label.toLowerCase() === 'minutes') {
      props.setSessionTime(props.sessionTime + ev.target.value * 60000);
    } else props.setSessionTime(props.sessionTime + ev.target.value * 1000);
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
        defaultValue={getTime()}
        onChange={handleChange}
      ></TextField>
    </Grid>
  );
};

export default TimerInput;
