import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const HistoryLine = (props) => {
  const { sessions } = props;

  //Distribution By Goals Chart
  const months = sessions.map((session) => {
    const month = dayjs(session.startTime).format('MMM');
    return month;
  });
  let distMonths = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  months.forEach((month) => {
    distMonths[month]++;
  });
  console.log('distMonths:', distMonths);

  let monthsArr = [];
  for (const [key, val] of Object.entries(distMonths)) {
    monthsArr.push(key);
  }
  let monthValsArr = [];
  for (const [key, val] of Object.entries(distMonths)) {
    monthValsArr.push(val);
  }

  const monthData = {
    series: [
      {
        data: monthValsArr,
      },
    ],
    categories: monthsArr,
  };
  console.log('monthData:', monthData);

  const options = {
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
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" width="500" />
        </div>
      </div>
    </div>
  );
};

export default HistoryLine;
