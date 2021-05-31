import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { alpha, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardHeader, Typography } from '@material-ui/core';

const DayOfWeekChart = (props) => {
  const sessions = useSelector((state) => state.sessions);
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
    <Card {...props}>
      <CardHeader
        subheader={
          <Typography color="textSecondary" variant="body2">
            Breakdown
          </Typography>
        }
        title="Day of Week"
      />
      {/* <Scrollbar> */}
      <Box
        sx={{
          height: 336,
          minWidth: 500,
          px: 2,
        }}
      >
        <Chart width="500" height="300" type="bar" {...chart} />
      </Box>
      {/* </Scrollbar> */}
    </Card>
  );
};

export default DayOfWeekChart;
