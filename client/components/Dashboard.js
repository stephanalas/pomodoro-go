import React from 'react';

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import DayOfWeekChart from './DayOfWeekChart';
import HeatMap from './HeatMap';

const Dashboard = () => {
  return (
    <div>
      <LastSession />
      <TotalSessions />
      <DayOfWeekChart />
      <HeatMap />
    </div>
  );
};

export default Dashboard;
