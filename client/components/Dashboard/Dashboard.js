import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@material-ui/core';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import ChartLeft from './ChartLeft';
import ChartRight from './ChartRight';
import Checkboxes from './Checkboxes';

const useStyles = makeStyles((theme) => ({
  contain: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
  formControlCheckboxes: {},
  formControlSelect: {
    minWidth: 100,
    marginRight: 10,
  },
  dashboardContain: {
    paddingLeft: 15,
    paddingRight: 15,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  let sessions = useSelector((state) => state.sessions);
  const auth = useSelector((state) => state.auth);

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
  const [state, setState] = useState({
    lastSession: true,
    totalSessions: true,
    averageSession: true,
    sessionDistribution: true,
    sessionFrequency: true,
  });

  const {
    lastSession,
    totalSessions,
    averageSession,
    sessionDistribution,
    sessionFrequency,
  } = state;

  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={3}>
          <Typography variant="overline">Dashboard</Typography>
          <Typography variant="h6">
            Good Afternoon{capitalized ? `, ${capitalized}` : ''}
            <br />
          </Typography>
          <Typography variant="subtitle2">Here is your latest data.</Typography>
        </Grid>
        <Grid item container xs={9} justify="flex-end" alignItems="flex-start">
          <Grid item xs={8}>
            <FormControl
              component="fieldset"
              className={classes.formControlCheckboxes}
            >
              <FormLabel component="legend">Display</FormLabel>
              <FormGroup row={true}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={lastSession}
                      onChange={handleCheckboxChange}
                      name="lastSession"
                    />
                  }
                  label="Last Session"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={totalSessions}
                      onChange={handleCheckboxChange}
                      name="totalSessions"
                    />
                  }
                  label="Total Sessions"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={averageSession}
                      onChange={handleCheckboxChange}
                      name="averageSession"
                    />
                  }
                  label="Average Session"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={sessionDistribution}
                      onChange={handleCheckboxChange}
                      name="sessionDistribution"
                    />
                  }
                  label="Session Distribution"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={sessionFrequency}
                      onChange={handleCheckboxChange}
                      name="sessionFrequency"
                    />
                  }
                  label="Session Frequency"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControlSelect}>
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
            <FormControl className={classes.formControlSelect}>
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
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          {lastSession ? <LastSession sessions={sessions} /> : ''}
        </Grid>
        <Grid item xs={4}>
          {totalSessions ? <TotalSessions sessions={sessions} /> : ''}
        </Grid>
        <Grid item xs={4}>
          {averageSession ? <AverageSession sessions={sessions} /> : ''}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {sessionDistribution ? <ChartLeft sessions={sessions} /> : ''}
        </Grid>
        <Grid item xs={6}>
          {sessionFrequency ? <ChartRight sessions={sessions} /> : ''}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
