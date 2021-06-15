import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import ChartLeft from './ChartLeft';
import ChartRight from './ChartRight';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
  formControl: {
    minWidth: 100,
    marginRight: 10,
  },
  dashboardContain: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const Dashboard = () => {
  const classes = useStyles();
  let sessions = useSelector((state) => state.sessions);
  const auth = useSelector((state) => state.auth);
  console.log('auth:', auth);
  if (auth) {
    sessions = sessions.filter((session) => session.userId === auth.id);
  }

  let goals = sessions.map((session) => {
    return session.goal;
  });

  const goalOptions = [];
  for (let i = 0; i < goals.length; i++) {
    if (!goalOptions.includes(goals[i])) {
      goalOptions.push(goals[i]);
    }
  }

  const [timeFrame, setTimeFrame] = useState('');
  const [goal, setGoal] = useState('');
  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };
  const handleGoalChange = (event) => {
    setGoal(event.target.value);
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
  if (goal !== 'All' && goal) {
    sessions = sessions.filter((session) => {
      return session.goal === goal;
    });
  }
  let capitalized = '';

  for (let i = 0; i < auth.username.length; i++) {
    const char = auth.username[i];
    if (i === 0) {
      capitalized += char.toUpperCase();
    } else capitalized += char;
  }

  return (
    <div className={classes.dashboardContain}>
      <Grid container direction="row" justify="space-between" spacing={3}>
        <Grid item>
          <Typography variant="overline">Dashboard</Typography>
          <Typography variant="h6">
            Good Afternoon{capitalized ? `, ${capitalized}` : ''}
            <br />
          </Typography>
          <Typography variant="subtitle2">Here is your latest data.</Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="time-frame-label">Period</InputLabel>
            <Select
              labelId="time-frame-label"
              value={timeFrame}
              onChange={handleTimeFrameChange}
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'Week'}>Week</MenuItem>
              <MenuItem value={'Month'}>Month</MenuItem>
              <MenuItem value={'Quarter'}>Quarter</MenuItem>
              <MenuItem value={'Year'}>Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="goal-label">Goal</InputLabel>
            <Select
              labelId="goal-label"
              value={goal}
              onChange={handleGoalChange}
            >
              <MenuItem value={'All'}>All</MenuItem>
              {goalOptions.map((goal, idx) => {
                return (
                  <MenuItem key={idx} value={goal}>
                    {goal}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
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
          <ChartLeft sessions={sessions} />
        </Grid>
        <Grid item xs={6}>
          <ChartRight sessions={sessions} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
