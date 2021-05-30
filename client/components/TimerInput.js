import React from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
}));

const TimerInput = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <TextField
        label={props.label}
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.input}
        variant="outlined"
      ></TextField>
    </Grid>
  );
};

export default TimerInput;
