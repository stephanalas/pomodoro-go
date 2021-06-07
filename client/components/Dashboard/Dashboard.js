import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import DayOfWeekChart from './DayOfWeekChart';
import HeatMap from './HeatMap';
const Dashboard = () => {
  let sessions = useSelector((state) => state.sessions);
  let goals = useSelector((state) => state.goals);

  const [timeFrame, setTimeFrame] = useState('All');
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
      return session.goalId === goal;
    });
  }
  return (
    <div>
      <FormControl>
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
      <FormControl>
        <InputLabel id="goal-label">Goal</InputLabel>
        <Select labelId="goal-label" value={goal} onChange={handleGoalChange}>
          <MenuItem value={'All'}>All</MenuItem>
          {goals.map((goal) => {
            return (
              <MenuItem key={goal.id} value={goal.id}>
                {goal.description}
              </MenuItem>
            );
          })}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
