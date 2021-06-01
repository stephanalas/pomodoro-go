import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { alpha, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardHeader, Typography } from '@material-ui/core';

const HeatMap = (props) => {
  const sessions = useSelector((state) => state.sessions);
  const sessionDays = sessions.map((session) => {
    const dayOfWeek = dayjs(session.startTime).format('ddd');
    return dayOfWeek;
  });
  const sessionTimes = sessions.map((session) => {
    const time = dayjs(session.startTime).format('H');
    return time;
  });

  const distHours = { Sun: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  }, Mon: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  }, Tue: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  }, Wed: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  }, Thu: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  }, Fri: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  }, Sat: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  } };

  if (sessions.length) {
    for (let i = 0; i < sessions.length; i++) {
      const dayOfWeek = dayjs(sessions[i].startTime).format('ddd');
      const time = dayjs(sessions[i].startTime).format('H');
      distHours[dayOfWeek][time]++
    }
  }
  console.log(distHours);

  const theme = useTheme();
  const chart = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      // colors: [['#3C4693', '#7783DB', '#7783DB'],]
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
    // plotOptions: {
    //   heatmap: {
    //     colorScale: {
    //       ranges: [
    //         {
    //           from: -30,
    //           to: 5,
    //           color: '#00A100',
    //           name: 'low',
    //         },
    //         {
    //           from: 6,
    //           to: 20,
    //           color: '#128FD9',
    //           name: 'medium',
    //         },
    //         {
    //           from: 21,
    //           to: 45,
    //           color: '#FFB200',
    //           name: 'high',
    //         },
    //       ],
    //     },
    //   },
    // },
    series: [
      {
        name: '5:00 PM',
        data: [
          {
            x: 'SUN',
            y: 5,
          },
          {
            x: 'MON',
            y: 20,
          },
          {
            x: 'TUE',
            y: 40,
          },
          {
            x: 'WED',
            y: 30,
          },
          {
            x: 'THU',
            y: 10,
          },
          {
            x: 'FRI',
            y: 1,
          },
          {
            x: 'SAT',
            y: 20,
          },
        ],
      },
      {
        name: '4:00 PM',
        data: [
          {
            x: 'W1',
            y: 10,
          },
          {
            x: 'W2',
            y: 20,
          },
          {
            x: 'W3',
            y: 30,
          },
          {
            x: 'W4',
            y: 40,
          },
        ],
      },
      {
        name: '3:00 PM',
        data: [
          {
            x: 'W1',
            y: 5,
          },
          {
            x: 'W2',
            y: 15,
          },
          {
            x: 'W3',
            y: 25,
          },
          {
            x: 'W4',
            y: 43,
          },
        ],
      },
      {
        name: '2:00 PM',
        data: [
          {
            x: 'W1',
            y: 43,
          },
          {
            x: 'W2',
            y: 43,
          },
          {
            x: 'W3',
            y: 43,
          },
          {
            x: 'W4',
            y: 43,
          },
        ],
      },
      {
        name: '1:00 PM',
        data: [
          {
            x: 'W1',
            y: 43,
          },
          {
            x: 'W2',
            y: 43,
          },
          {
            x: 'W3',
            y: 43,
          },
          {
            x: 'W4',
            y: 43,
          },
        ],
      },
      {
        name: '12:00 PM',
        data: [
          {
            x: 'W1',
            y: 43,
          },
          {
            x: 'W2',
            y: 43,
          },
          {
            x: 'W3',
            y: 43,
          },
          {
            x: 'W4',
            y: 43,
          },
        ],
      },
      {
        name: '11:00 AM',
        data: [
          {
            x: 'W1',
            y: 43,
          },
          {
            x: 'W2',
            y: 43,
          },
          {
            x: 'W3',
            y: 43,
          },
          {
            x: 'W4',
            y: 43,
          },
        ],
      },
      {
        name: '10:00 AM',
        data: [
          {
            x: 'W1',
            y: 43,
          },
          {
            x: 'W2',
            y: 43,
          },
          {
            x: 'W3',
            y: 43,
          },
          {
            x: 'W4',
            y: 43,
          },
        ],
      },
      {
        name: '9:00 AM',
        data: [
          {
            x: 'W1',
            y: 43,
          },
          {
            x: 'W2',
            y: 43,
          },
          {
            x: 'W3',
            y: 43,
          },
          {
            x: 'W4',
            y: 43,
          },
        ],
      },
    ],
  };

  return (
    <Card {...props}>
      <CardHeader
        subheader={
          <Typography color="textSecondary" variant="body2">
            Breakdown
          </Typography>
        }
        title="HeatMap"
        color="textPrimary"
      />
      {/* <Scrollbar> */}
      <Box
        sx={{
          height: 336,
          minWidth: 500,
          px: 2,
        }}
      >
        <Chart width="500" height="300" type="heatmap" {...chart} />
      </Box>
      {/* </Scrollbar> */}
    </Card>
  );
};

export default HeatMap;
