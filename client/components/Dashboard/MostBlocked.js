import React from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import BlocksDonut from './BlocksDonut';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    minHeight: 250,
    flexGrow: 1,
  },
  lsItem: {
    padding: 8,
  },
});

const MostBlocked = (props) => {
  const classes = useStyles();
  console.log('props in MostBlocked:', props);
  const { blackList } = props;
  const blocks = blackList.map((entry) => entry.blocks);
  const maxBlocks = Math.max(...blocks) * 1;
  const mostBlocked = blackList.find((entry) => {
    return entry.blocks === maxBlocks;
  });

  return (
    <Paper className={classes.contain}>
      <Typography className={classes.lsItem} variant="h5" color="primary">
        Most Blocked
      </Typography>
      <Grid container>
        <Grid container item direction="column" xs={6}>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Twitter
            </Typography>
            <Typography variant="h5">
              {mostBlocked ? mostBlocked.blocks : ''}
            </Typography>
          </Grid>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Facebook
            </Typography>
            <Typography variant="h5">
              {blackList
                .filter((entry) => {
                  return entry.site.siteUrl === 'https://www.facebook.com/';
                })
                .map((entry) => {
                  return entry.blocks;
                })}
            </Typography>
          </Grid>
          <Grid item className={classes.lsItem} xs={4}>
            <Typography variant="caption" color="textSecondary">
              Netflix
            </Typography>
            <Typography variant="h5">
              {blackList
                .filter((entry) => {
                  console.log('entry:', entry);
                  return entry.site.siteUrl === 'https://www.netflix.com/';
                })
                .map((entry) => {
                  console.log('entry in map:', entry);
                  return entry.blocks;
                })}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <BlocksDonut blackList={blackList} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MostBlocked;
