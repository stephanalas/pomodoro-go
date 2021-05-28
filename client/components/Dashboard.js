import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

import LastSession from './LastSession';
import TotalSessions from './TotalSessions';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    maxWidth: 300,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
});

const Dashboard = () => {
  return (
    <div>
      <LastSession />
      <TotalSessions />
    </div>
  );
};

export default Dashboard;
