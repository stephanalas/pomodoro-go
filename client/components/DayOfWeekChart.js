import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { alpha, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardHeader, Typography } from '@material-ui/core';
import { format } from 'date-fns';

const data = {
  series: [
    {
      data: [12, 24, 36, 48, 60, 72, 84],
    },
    {
      data: [12, 24, 36, 48, 60, 72, 84],
    },
    {
      data: [12, 24, 36, 48, 60, 72, 84],
    },
  ],
  categories: [
    'Capital One',
    'Ally Bank',
    'ING',
    'Ridgewood',
    'BT Transilvania',
    'CEC',
    'CBC',
  ],
};

const DayOfWeekChart = (props) => {
  // const sessions = useSelector((state) => state.sessions);
  // const sessionDays = sessions.map((session) => {
  //   const dayOfWeek = dayjs(session.startTime).format('ddd');
  //   return dayOfWeek;
  // });
  // const distDays = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
  // if (sessions.length) {
  //   for (let i = 0; i < sessionDays.length; i++) {
  //     distDays[sessionDays[i]]++;
  //   }
  // }

  // let dataArr = [];
  // for (const [key, val] of Object.entries(distDays)) {
  //   dataArr.push({ name: key, qty: val });
  // }
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
            {format(new Date(), 'MMM yyyy')}
          </Typography>
        }
        title="Total Transactions"
      />
      {/* <Scrollbar> */}
      <Box
        sx={{
          height: 336,
          minWidth: 500,
          px: 2,
        }}
      >
        <Chart height="300" type="bar" {...chart} />
      </Box>
      {/* </Scrollbar> */}
    </Card>
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart width={730} height={250} data={dataArr}>
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey="name" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Bar dataKey="qty" fill="#8884d8" />
    //   </BarChart>
    // </ResponsiveContainer>
  );
};

export default DayOfWeekChart;
