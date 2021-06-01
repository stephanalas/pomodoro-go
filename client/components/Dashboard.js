import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import DayOfWeekChart from './DayOfWeekChart';
import HeatMap from './HeatMap';

const Dashboard = () => {
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
