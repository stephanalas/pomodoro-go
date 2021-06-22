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

//This component displays either the 'By Day of Week' bar chart or the 'By Goal'
//bar chart depending on what is selected from the dropdown menu
const ChartLeft = (props) => {
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
    series: [{ name: 'Sessions', data: valsArr }],
    categories: daysArr,
  };

  const chart = {
    options: {
      chart: {
        background: 'transparent',
        stacked: true,
        toolbar: {
          show: true,
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

  //Distribution By Hours Chart
  const sessionHours = sessions.map((session) => {
    const hourOfDay = dayjs(session.startTime).format('H');
    return hourOfDay;
  });
  const distHours = {
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
  };
  if (sessions.length) {
    for (let i = 0; i < sessionHours.length; i++) {
      distHours[sessionHours[i]]++;
    }
  }

  let hoursArr = [];
  for (const [key, val] of Object.entries(distHours)) {
    hoursArr.push(key);
  }

  let hourValsArr = [];
  for (const [key, val] of Object.entries(distHours)) {
    hourValsArr.push(val);
  }
  console.log(hourValsArr);
  const hourData = {
    series: [{ name: 'Sessions', data: hourValsArr }],
    categories: hoursArr,
  };

  const hourChart = {
    options: {
      chart: {
        background: 'transparent',
        stacked: true,
        toolbar: {
          show: true,
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

      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },

        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
        categories: [
          '12:00 AM',
          '1:00 AM',
          '2:00 AM',
          '3:00 AM',
          '4:00 AM',
          '5:00 AM',
          '6:00 AM',
          '7:00 AM',
          '8:00 AM',
          '9:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 PM',
          '1:00 PM',
          '2:00 PM',
          '3:00 PM',
          '4:00 PM',
          '5:00 PM',
          '6:00 PM',
          '7:00 PM',
          '8:00 PM',
          '9:00 PM',
          '10:00 PM',
          '11:00 PM',
        ],
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.secondary,
          },
          formatter: function (val, index) {
            return val.toFixed(0);
          },
        },
      },
    },
    series: hourData.series,
  };

  // const hourChart = {
  //   options: {
  //     chart: {
  //       background: 'transparent',
  //       stacked: true,
  //       toolbar: {
  //         show: true,
  //       },
  //     },
  //     colors: ['#3C4693', '#7783DB', '#7783DB'],
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     grid: {
  //       borderColor: theme.palette.divider,
  //       xaxis: {
  //         lines: {
  //           show: true,
  //         },
  //       },
  //       yaxis: {
  //         lines: {
  //           show: true,
  //         },
  //       },
  //     },
  //     states: {
  //       active: {
  //         filter: {
  //           type: 'none',
  //         },
  //       },
  //       hover: {
  //         filter: {
  //           type: 'none',
  //         },
  //       },
  //     },
  //     legend: {
  //       show: false,
  //     },
  //     stroke: {
  //       colors: ['transparent'],
  //       show: true,
  //       width: 2,
  //     },
  //     // theme: {
  //     //   mode: theme.palette.mode,
  //     // },
  //     tooltip: {
  //       mode: theme.palette.mode,
  //     },
  //     xaxis: {
  //       axisBorder: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //       categories: [
  //         '12:00 AM',
  //         '1:00 AM',
  //         '2:00 AM',
  //         '3:00 AM',
  //         '4:00 AM',
  //         '5:00 AM',
  //         '6:00 AM',
  //         '7:00 AM',
  //         '8:00 AM',
  //         '9:00 AM',
  //         '10:00 AM',
  //         '11:00 AM',
  //         '12:00 PM',
  //         '1:00 PM',
  //         '2:00 PM',
  //         '3:00 PM',
  //         '4:00 PM',
  //         '5:00 PM',
  //         '6:00 PM',
  //         '7:00 PM',
  //         '8:00 PM',
  //         '9:00 PM',
  //         '10:00 PM',
  //         '11:00 PM',
  //       ],
  //       labels: {
  //         style: {
  //           colors: theme.palette.text.secondary,
  //         },
  //       },
  //     },
  //     yaxis: {
  //       // decimalsInFloat: 0,
  //       labels: {
  //         offsetX: -12,
  //         style: {
  //           colors: theme.palette.text.secondary,
  //         },
  //       },
  //     },
  //   },
  //   series: hourData.series,
  // };

  //Distribution By Goals Chart
  const sessionGoals = sessions.map((session) => {
    const goal = session.goal;
    return goal;
  });

  let distGoals = {};
  sessionGoals.forEach((goal) => {
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
          show: true,
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
            Sessions by {distribution}
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
              <MenuItem value={'Hour of Day'}>Hour of Day</MenuItem>
              <MenuItem value={'Goal'}>Goal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {distribution === 'Day of Week' ? (
        <Chart width="800" height="450" type="bar" {...chart} />
      ) : (
        ''
      )}
      {distribution === 'Hour of Day' ? (
        <Chart width="800" height="450" type="bar" {...hourChart} />
      ) : (
        ''
      )}
      {distribution === 'Goal' ? (
        <Chart width="800" height="450" type="bar" {...goalChart} />
      ) : (
        ''
      )}
    </Card>
  );
};

export default ChartLeft;
