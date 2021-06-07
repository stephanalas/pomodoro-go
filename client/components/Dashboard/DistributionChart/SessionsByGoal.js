import React from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

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
});

const SessionsByGoal = (props) => {
  const classes = useStyles();
  const { sessions } = props;
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
  let valsArr = [];
  for (const [key, val] of Object.entries(distGoals)) {
    valsArr.push(val);
  }
  console.log(valsArr);

  const data = {
    series: [
      {
        data: valsArr,
      },
    ],
    categories: goalsArr,
  };

  const theme = useTheme();
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

  return (
    <Card className={classes.contain} {...props}>
      <Typography className={classes.lsItem} variant="h5" color="primary">
        Session Distribution
      </Typography>
      <Typography
        className={classes.lsItem}
        variant="caption"
        color="textSecondary"
      >
        Goal
      </Typography>

      <Chart width="800" height="450" type="bar" {...chart} />
    </Card>
  );
};

export default SessionsByGoal;
