import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@material-ui/core';

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
  },
});

const DayOfWeekChart = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { sessions } = props;
  const [distribution, setDistribution] = useState('Day of Week');

  const handleDistributionChange = (event) => {
    setDistribution(event.target.value);
  };

  //Distribution By Days Chart
  const sessionDays = sessions.map((session) => {
    const dayOfWeek = dayjs(session.startTime).format('ddd');
    return dayOfWeek;
  });
  const distDays = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
  if (sessions.length) {
    for (let i = 0; i < sessionDays.length; i++) {
      distDays[sessionDays[i]]++;
    }
  }

  let daysArr = [];
  for (const [key, val] of Object.entries(distDays)) {
    daysArr.push(key);
  }

  let valsArr = [];
  for (const [key, val] of Object.entries(distDays)) {
    valsArr.push(val);
  }

  const data = {
    series: [
      {
        data: valsArr,
      },
    ],
    categories: daysArr,
  };

  const chart = {
    options: {
      chart: {
        background: 'transparent',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ['#3C4693', '#7783DB', '#7783DB'],
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      states: {
        active: {
          filter: {
            type: 'none',
          },
        },
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2,
      },
      theme: {
        mode: theme.palette.mode,
      },
      tooltip: {
        mode: theme.palette.mode,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: data.categories,
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
    },
    series: data.series,
  };

  //Distribution By Goals Chart
  const sessionGoals = sessions.map((session) => {
    const goal = session.goal.description;
    return goal;
  });
  // console.log('sessionGoals:', sessionGoals);
  let distGoals = {};
  sessionGoals.forEach((goal) => {
    // console.log('goal:', goal);
    if (distGoals[goal]) distGoals[goal]++;
    else {
      distGoals[goal] = 1;
    }
  });

  let goalsArr = [];
  for (const [key, val] of Object.entries(distGoals)) {
    goalsArr.push(key);
  }
  let goalValsArr = [];
  for (const [key, val] of Object.entries(distGoals)) {
    goalValsArr.push(val);
  }

  const goalData = {
    series: [
      {
        data: goalValsArr,
      },
    ],
    categories: goalsArr,
  };

  const goalChart = {
    options: {
      chart: {
        background: 'transparent',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ['#3C4693', '#7783DB', '#7783DB'],
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      states: {
        active: {
          filter: {
            type: 'none',
          },
        },
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2,
      },
      theme: {
        mode: theme.palette.mode,
      },
      tooltip: {
        mode: theme.palette.mode,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: goalData.categories,
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
    },
    series: goalData.series,
  };

  return (
    <Card className={classes.contain} {...props}>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography className={classes.lsItem} variant="h5" color="primary">
            Session Distribution
          </Typography>
          <Typography
            className={classes.lsItem}
            variant="caption"
            color="textSecondary"
          >
            {distribution}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="distribution-label">Display</InputLabel>
            <Select
              labelId="distribution-label"
              value={distribution}
              onChange={handleDistributionChange}
            >
              <MenuItem value={'Day of Week'}>Day of Week</MenuItem>
              <MenuItem value={'Goal'}>Goal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {distribution === 'Day of Week' ? (
        <Chart width="800" height="450" type="bar" {...chart} />
      ) : (
        <Chart width="800" height="450" type="bar" {...goalChart} />
      )}
    </Card>
  );
};

export default DayOfWeekChart;
