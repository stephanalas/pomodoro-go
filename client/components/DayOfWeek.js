import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DayOfWeekChart from './DayOfWeekChart';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 500,
    minHeight: 500,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
});

const DayOfWeek = () => {
  const classes = useStyles();
  //useSelector allows this component to access state
  const sessions = useSelector((state) => state.sessions);
  const [timeFrame, setTimeFrame] = useState('Quarter');
  // console.log('this.state', this.state);
  const handleChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <Paper className={classes.contain}>
      <FormControl>
        <InputLabel id="time-frame-label"></InputLabel>
        <Select
          labelId="time-frame-label"
          value={timeFrame}
          onChange={handleChange}
        >
          <MenuItem value={'Week'}>Week</MenuItem>
          <MenuItem value={'Month'}>Month</MenuItem>
          <MenuItem value={'Quarter'}>Quarter</MenuItem>
        </Select>
      </FormControl>
      <DayOfWeekChart timeFrame={timeFrame} />
    </Paper>
  );
};

export default DayOfWeek;
