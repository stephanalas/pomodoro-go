import React from 'react';
import Chart from 'react-apexcharts';

const BlocksDonut = (props) => {
  console.log('props:', props);
  const { blackList } = props;
  const blocks = blackList.map((entry) => entry.blocks);
  const sites = blackList.map((entry) => entry.site.siteUrl);

  const chart = {
    options: {
      dataLabels: { enabled: false },
      colors: ['#233096', '#3C4693', '#7783DB', '#636996', '#7a90fa'],
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
      <Chart
        options={chart.options}
        series={chart.series}
        type="donut"
        width="290"
      />
    </div>
  );
};

export default BlocksDonut;
