import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, Card, Typography } from '@material-ui/core';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

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

const HistoryLine = (props) => {
  const classes = useStyles();
  const { sessions } = props;

  //Distribution By Goals Chart
  const months = sessions.map((session) => {
    const month = dayjs(session.startTime).format('MMM');
    return month;
  });
  let seriesMonths = {
    Jan: { successful: 0, failed: 0 },
    Feb: { successful: 0, failed: 0 },
    Mar: { successful: 0, failed: 0 },
    Apr: { successful: 0, failed: 0 },
    May: { successful: 0, failed: 0 },
    Jun: { successful: 0, failed: 0 },
    Jul: { successful: 0, failed: 0 },
    Aug: { successful: 0, failed: 0 },
    Sep: { successful: 0, failed: 0 },
    Oct: { successful: 0, failed: 0 },
    Nov: { successful: 0, failed: 0 },
    Dec: { successful: 0, failed: 0 },
  };
  sessions.forEach((session) => {
    const { startTime, successful } = session;
    const month = dayjs(startTime).format('MMM');
    if (successful === true) {
      seriesMonths[month].successful++;
    } else {
      seriesMonths[month].failed++;
    }
  });
  console.log('seriesMonths:', seriesMonths);

  let monthsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthsArr.push(key);
  }
  let monthValsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthValsArr.push(val);
  }

  const monthData = {
    series: [
      {
        name: 'Successful',
        data: monthValsArr.map((val) => {
          return val.successful;
        }),
      },
      {
        name: 'Failed',
        data: monthValsArr.map((val) => {
          return val.failed;
        }),
      },
    ],
    categories: monthsArr,
  };
  console.log('monthData:', monthData);

  const options = {
    colors: ['#3C4693', '#FF1654'],
    chart: {
      id: 'basic-line',
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  };
  const series = monthData.series;

  return (
    <div className="app">
      <Card className={classes.contain} {...props}>
        <Typography className={classes.lsItem} variant="h5" color="primary">
          Session Frequency
        </Typography>
        <Typography
          className={classes.lsItem}
          variant="caption"
          color="textSecondary"
        >
          Time of Week
        </Typography>
        <Box
          sx={{
            height: 336,
            minWidth: 500,
            px: 2,
          }}
        >
          <Chart options={options} series={series} type="line" width="500" />
        </Box>
      </Card>
    </div>
  );
};

export default HistoryLine;
