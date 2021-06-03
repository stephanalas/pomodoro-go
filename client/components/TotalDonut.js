import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Chart from 'react-apexcharts';

const TotalDonut = () => {
  const sessions = useSelector((state) => state.sessions);

  let total;
  if (sessions.length) {
    total = sessions.length;
  }

  let totalSuccessful = [];
  let totalFailed = [];

  if (sessions.length) {
    totalSuccessful = sessions.filter((session) => {
      return session.successful === true;
    });
    totalFailed = sessions.filter((session) => {
      return session.successful === false;
    });
  }

  const chart = {
    options: {
      colors: ['#3C4693', '#7783DB'],
      labels: ['Successful', 'Failed'],
    },

    series: [totalSuccessful.length, totalFailed.length],
  };

  return (
    <div className="donut">
      <Chart
        options={chart.options}
        series={chart.series}
        type="donut"
        width="380"
      />
    </div>
  );
};

export default TotalDonut;
