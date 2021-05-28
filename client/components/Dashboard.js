<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
=======
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

>>>>>>> Stashed changes
import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import DayOfWeekChart from './DayOfWeekChart';
import HeatMap from './HeatMap';

const Dashboard = () => {
<<<<<<< Updated upstream
  let sessions = useSelector((state) => state.sessions);
  const [timeFrame, setTimeFrame] = useState('Year');
  const handleChange = (event) => {
    setTimeFrame(event.target.value);
  };

  if (timeFrame === 'Year') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 365;
    });
    sessions = filtered;
  }
  if (timeFrame === 'Quarter') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 90;
    });
    sessions = filtered;
  } else if (timeFrame === 'Month') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 30;
    });
    sessions = filtered;
  } else if (timeFrame === 'Week') {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 7;
    });
    sessions = filtered;
  }

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
          <MenuItem value={'Year'}>Year</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <LastSession sessions={sessions} />
        </Grid>
        <Grid item xs={4}>
          <TotalSessions sessions={sessions} />
        </Grid>
        <Grid item xs={4}>
          <AverageSession sessions={sessions} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <DayOfWeekChart sessions={sessions} />
        </Grid>
        <Grid item xs={6}>
          <HeatMap sessions={sessions} />
=======
  return (
    <div>
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
          <DayOfWeekChart />
        </Grid>
        <Grid item xs={6}>
          <HeatMap />
>>>>>>> Stashed changes
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
