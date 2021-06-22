import React from 'react';
import Chart from 'react-apexcharts';

const BlocksDonut = (props) => {
  const { sortedBlackList } = props;
  console.log('sortedBlackList in blocksDonut:', sortedBlackList);
  if (sortedBlackList.length) {
    let topFive = [];
    for (let i = 0; i < 5; i++) {
      topFive.push(sortedBlackList[i]);
    }
    console.log('topFive:', topFive);
    const sites = topFive.map((entry) => entry.site.siteUrl);
    console.log(sites);
    const blocks = topFive.map((entry) => entry.blocks);
    console.log(blocks);

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
  }
  return null;
};

export default BlocksDonut;
