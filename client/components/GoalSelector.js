import React from 'react';
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
  select: {
    width: '50%',
  },
  form: {
    width: '100%',
  },
}));
const GoalSelector = (props) => {
  const { goal, setGoal } = props;

  const handleChange = (ev) => {
    setGoal(ev.target.value);
  };
  const classes = useStyles();
  return (
    <Grid container item>
      <FormControl className={classes.form}>
        <InputLabel id="goal-label">Select Goal</InputLabel>
        <Select
          labelId="goal-label"
          className={classes.select}
          value={goal}
          onChange={handleChange}
        >
          <MenuItem value="Study">Study</MenuItem>
          <MenuItem value="Meditate">Meditate</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default GoalSelector;
