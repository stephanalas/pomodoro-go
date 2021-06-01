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

  const distHours = [
    {name: '0', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '1', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '2', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '3', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '4', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '5', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '6', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '7', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '8', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '9', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '10', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '11', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '12', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '13', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '14', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '15', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '16', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '17', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '18', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '19', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '20', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '21', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '22', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    {name: '23', data: [{x: 'Sun',y:0}, {x: 'Mon',y:0}, {x: 'Tue',y:0}, {x: 'Wed',y:0}, {x: 'Thu',y:0}, {x: 'Fri',y:0},{x: 'Sat',y:0}]},
    ]

  // const distHours = { Sun: {
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  //   7: 0,
  //   8: 0,
  //   9: 0,
  //   10: 0,
  //   11: 0,
  //   12: 0,
  //   13: 0,
  //   14: 0,
  //   15: 0,
  //   16: 0,
  //   17: 0,
  //   18: 0,
  //   19: 0,
  //   20: 0,
  //   21: 0,
  //   22: 0,
  //   23: 0,
  // }, Mon: {
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  //   7: 0,
  //   8: 0,
  //   9: 0,
  //   10: 0,
  //   11: 0,
  //   12: 0,
  //   13: 0,
  //   14: 0,
  //   15: 0,
  //   16: 0,
  //   17: 0,
  //   18: 0,
  //   19: 0,
  //   20: 0,
  //   21: 0,
  //   22: 0,
  //   23: 0,
  // }, Tue: {
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  //   7: 0,
  //   8: 0,
  //   9: 0,
  //   10: 0,
  //   11: 0,
  //   12: 0,
  //   13: 0,
  //   14: 0,
  //   15: 0,
  //   16: 0,
  //   17: 0,
  //   18: 0,
  //   19: 0,
  //   20: 0,
  //   21: 0,
  //   22: 0,
  //   23: 0,
  // }, Wed: {
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  //   7: 0,
  //   8: 0,
  //   9: 0,
  //   10: 0,
  //   11: 0,
  //   12: 0,
  //   13: 0,
  //   14: 0,
  //   15: 0,
  //   16: 0,
  //   17: 0,
  //   18: 0,
  //   19: 0,
  //   20: 0,
  //   21: 0,
  //   22: 0,
  //   23: 0,
  // }, Thu: {
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  //   7: 0,
  //   8: 0,
  //   9: 0,
  //   10: 0,
  //   11: 0,
  //   12: 0,
  //   13: 0,
  //   14: 0,
  //   15: 0,
  //   16: 0,
  //   17: 0,
  //   18: 0,
  //   19: 0,
  //   20: 0,
  //   21: 0,
  //   22: 0,
  //   23: 0,
  // }, Fri: {
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  //   7: 0,
  //   8: 0,
  //   9: 0,
  //   10: 0,
  //   11: 0,
  //   12: 0,
  //   13: 0,
  //   14: 0,
  //   15: 0,
  //   16: 0,
  //   17: 0,
  //   18: 0,
  //   19: 0,
  //   20: 0,
  //   21: 0,
  //   22: 0,
  //   23: 0,
  // }, Sat: {
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  //   7: 0,
  //   8: 0,
  //   9: 0,
  //   10: 0,
  //   11: 0,
  //   12: 0,
  //   13: 0,
  //   14: 0,
  //   15: 0,
  //   16: 0,
  //   17: 0,
  //   18: 0,
  //   19: 0,
  //   20: 0,
  //   21: 0,
  //   22: 0,
  //   23: 0,
  // } };

  if (sessions.length) {
    for (let i = 0; i < sessions.length; i++) {
      const dayOfWeek = dayjs(sessions[i].startTime).format('ddd');
      const time = dayjs(sessions[i].startTime).format('H');
      const timeSlot = distHours[time];
      console.log(timeSlot)
      const slotData = timeSlot.data;
      for (let j = 0; j < slotData.length; j++) {
        if (slotData[j].x === dayOfWeek) slotData[j].y++
      }
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
    series: distHours,
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
