import React from 'react';

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import DayOfWeekChart from './DayOfWeekChart';

const Dashboard = () => {
  return (
    <div>
      <LastSession />
      <TotalSessions />
      <DayOfWeekChart />
    </div>
  );
};

export default Dashboard;
