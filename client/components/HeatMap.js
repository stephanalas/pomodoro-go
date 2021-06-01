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

  if (sessions.length) {
    for (let i = 0; i < sessions.length; i++) {
      const dayOfWeek = dayjs(sessions[i].startTime).format('ddd');
      const time = dayjs(sessions[i].startTime).format('H');
      const timeSlot = distHours[time];
      const slotData = timeSlot.data;
      for (let j = 0; j < slotData.length; j++) {
        if (slotData[j].x === dayOfWeek) slotData[j].y++
      }
    }
  }

  const theme = useTheme();
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

  return (
    <Card {...props}>
      <CardHeader
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
