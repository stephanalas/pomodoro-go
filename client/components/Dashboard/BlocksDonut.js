import React from 'react';
import Chart from 'react-apexcharts';

const BlocksDonut = (props) => {
  const { sortedBlackList } = props;

  const topFive = sortedBlackList.filter((entry, idx) => {
    return idx < 5;
  });
  const sites = topFive.map((entry) => entry.site.name);
  const blocks = topFive.map((entry) => entry.blocks);

  const chart = {
    options: {
      dataLabels: { enabled: false },
      colors: ['#261689', '#5c4fa8', '#9671a2', '#4d2a4e', '#e4ddee'],
      labels: sites,
      legend: { show: false, position: 'bottom' },
      chart: {
        toolbar: {
          show: false,
        },
        offsetX: -70,
        offsetY: -40,
      },
    },

    series: blocks,
  };

  return (
    <div className="donut">
      {sortedBlackList.length ? (
        <Chart
          options={chart.options}
          series={chart.series}
          type="donut"
          width="290"
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default BlocksDonut;
