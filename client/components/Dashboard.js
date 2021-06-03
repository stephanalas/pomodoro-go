import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import DayOfWeekChart from './DayOfWeekChart';
import HeatMap from './HeatMap';

const Dashboard = () => {
  let sessions = useSelector((state) => state.sessions);
  const [timeFrame, setTimeFrame] = useState('Quarter');
  // console.log('this.state', this.state);
  const handleChange = (event) => {
    setTimeFrame(event.target.value);
  };
  if (timeFrame === 'Quarter') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 90;
    });
    sessions = filtered;
    // console.log('filtered:', filtered);
  }
  console.log(timeFrame, sessions);

  return (
    <div>
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
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <LastSession />
        </Grid>
        <Grid item xs={4}>
          <TotalSessions />
        </Grid>
        <Grid item xs={4}>
          <AverageSession />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DayOfWeekChart sessions={sessions} />
        </Grid>
        <Grid item xs={6}>
          <HeatMap />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
