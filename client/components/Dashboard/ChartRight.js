import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
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
});

//This component displays either the Session History or Session Frequency charts
// depending on what is selected from the dropdown menu
const ChartRight = (props) => {
  const classes = useStyles();
  const { sessions } = props;
  const [rightChart, setRightChart] = useState('Frequency');

  const handleRightChartChange = (event) => {
    setRightChart(event.target.value);
  };

  //Session Frequency chart
  let totalExpectedSessionLength;
  if (sessions.length) {
    totalExpectedSessionLength = sessions.reduce((total, session) => {
      total += session.sessionTime;
      return total;
    }, 0);
  }

  const distHours = [
    {
      name: '0',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '1',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '2',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '3',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '4',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '5',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '6',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '7',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '8',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '9',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '10',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '11',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '12',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '13',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '14',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '15',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '16',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '17',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '18',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '19',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '20',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '21',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '22',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
    {
      name: '23',
      data: [
        { x: 'Sun', y: 0 },
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 0 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
      ],
    },
  ];

  if (sessions.length) {
    for (let i = 0; i < sessions.length; i++) {
      const dayOfWeek = dayjs(sessions[i].startTime).format('ddd');
      const time = dayjs(sessions[i].startTime).format('H');
      const timeSlot = distHours[time];
      const slotData = timeSlot.data;
      for (let j = 0; j < slotData.length; j++) {
        if (slotData[j].x === dayOfWeek) slotData[j].y++;
      }
    }
  }

  const chart = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: ['#3C4693'],
      dataLabels: {
        enabled: false,
      },
      grid: {
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
    },
    series: distHours,
  };

  //Session History Chart
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
    <Card className={classes.contain} {...props}>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography className={classes.lsItem} variant="h5" color="primary">
            {rightChart === 'Frequency' ? 'Session Frequency' : ''}
            {rightChart === 'History' ? 'Session History' : ''}
          </Typography>
          <Typography
            className={classes.lsItem}
            variant="caption"
            color="textSecondary"
          >
            {rightChart === 'Frequency' ? 'Time of Week' : ''}
            {rightChart === 'History' ? 'Month' : ''}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="misc-label">Display</InputLabel>
            <Select
              labelId="misc-label"
              value={rightChart}
              onChange={handleRightChartChange}
            >
              <MenuItem value={'Frequency'}>Frequency</MenuItem>
              <MenuItem value={'History'}>History</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Box
          sx={{
            height: 336,
            minWidth: 500,
            px: 2,
          }}
        >
          {rightChart === 'Frequency' ? (
            <Chart width="800" height="450" type="heatmap" {...chart} />
          ) : (
            ''
          )}
          {rightChart === 'History' ? (
            <Chart
              options={options}
              series={series}
              type="line"
              width="800"
              height="450"
            />
          ) : (
            ''
          )}
        </Box>
      </Grid>
    </Card>
  );
};

export default ChartRight;
