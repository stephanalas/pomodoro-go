import React from 'react';

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';
import DayOfWeek from './DayOfWeek';

const Dashboard = () => {
  return (
    <div>
      <LastSession />
      <TotalSessions />
      <DayOfWeek />
    </div>
  );
};

export default Dashboard;
