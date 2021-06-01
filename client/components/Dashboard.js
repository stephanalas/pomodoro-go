import React from 'react';

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import AverageSession from './AverageSession';
import DayOfWeekChart from './DayOfWeekChart';
import HeatMap from './HeatMap';

const Dashboard = () => {
  return (
    <div>
      <LastSession />
      <TotalSessions />
      <AverageSession />
      <DayOfWeekChart />
      <HeatMap />
    </div>
  );
};

export default Dashboard;
