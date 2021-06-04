<<<<<<< Updated upstream
import React from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
=======
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardHeader, Typography } from '@material-ui/core';
>>>>>>> Stashed changes

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    // maxWidth: 600,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
});

const DayOfWeekChart = (props) => {
  const classes = useStyles();
<<<<<<< Updated upstream
  // let timeFrame = useSelector((state) => state.timeFrame);
  // const handleChange = (event) => {
  //   setTimeFrame(event.target.value);
  // };
  const { sessions } = props;

=======
  const sessions = useSelector((state) => state.sessions);
>>>>>>> Stashed changes
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
        Day of Week
      </Typography>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
      <Chart width="800" height="450" type="bar" {...chart} />
    </Card>
  );
};

export default DayOfWeekChart;
