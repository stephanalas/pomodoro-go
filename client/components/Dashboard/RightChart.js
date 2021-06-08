import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import HeatMap from './HeatMap';
import HistoryLine from './HistoryLine';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
});

const RightChart = (props) => {
  const classes = useStyles();
  const { sessions } = props;
  const [rightChart, setRightChart] = useState('Frequency');

  const handleRightChartChange = (event) => {
    setRightChart(event.target.value);
  };

  return (
    <Card className={classes.contain} {...props}>
      <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel id="misc-label">Display</InputLabel>
          <Select
            labelId="misc-label"
            value={rightChart}
            onChange={handleRightChartChange}
          >
            <MenuItem value={'Frequency'}>Frequency</MenuItem>
            <MenuItem value={'History'}>History</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {rightChart === 'Frequency' ? <HeatMap sessions={sessions} /> : ''}
      {rightChart === 'History' ? <HistoryLine sessions={sessions} /> : ''}
    </Card>
  );
};

export default RightChart;
