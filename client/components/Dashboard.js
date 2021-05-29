import React from 'react';

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';

const Dashboard = () => {
  return (
    <div>
      <LastSession />
      <TotalSessions />
    </div>
  );
};

export default Dashboard;
