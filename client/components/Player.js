import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getCurrPlayback } from '../store/spotify/getCurrPlayback';
import { getRecentTrack } from '../store/spotify/getRecentTrack';
import { extractQueries } from '../../utils/helper';

// everything material-ui
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

//import other components
import PlayerPlaylist from './PlayerPlaylist';
import PlayerDevices from './PlayerDevices';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 400,
    marginRight: 10,
    height: 250,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 230,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  deviceList: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  deviceItem: {
    borderBottom: '1px solid #e57373',
  },
  spotifyConnect: {
    width: '50%',
    margin: 'auto',
  },
}));

const SpotifyConnectButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: '#1AB954',
    '&:hover': {
      backgroundColor: '#14873c',
    },
    borderRadius: 50,
    width: 200,
  },
}))(Button);

const Player = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  console.log(props);

  const accessToken = props.location?.search.slice(1);

  const playStart = async () => {
    const args = window.localStorage.getItem('spotify_access_token');
    if (props.currPlayback.is_playing === true) {
      await axios.put(
        'https://api.spotify.com/v1/me/player/pause',
        {},
        {
          headers: {
            Authorization: `Bearer ${args}`,
          },
        }
      );
      props.getCurrPlayback(
        window.localStorage.getItem('spotify_access_token')
      );
    } else {
      await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        {},
        {
          headers: {
            Authorization: `Bearer ${args}`,
          },
        }
      );
      props.getCurrPlayback(
        window.localStorage.getItem('spotify_access_token')
      );
    }
    console.log('play! updated playback: ', props.currPlayback);
  };

  const playPrevious = async () => {
    const args = window.localStorage.getItem('spotify_access_token');
    await axios.post(
      'https://api.spotify.com/v1/me/player/previous',
      {},
      {
        headers: {
          Authorization: `Bearer ${args}`,
        },
      }
    );
    props.getCurrPlayback(window.localStorage.getItem('spotify_access_token'));
  };

  const playNext = async () => {
    const args = window.localStorage.getItem('spotify_access_token');
    await axios.post(
      'https://api.spotify.com/v1/me/player/next',
      {},
      {
        headers: {
          Authorization: `Bearer ${args}`,
        },
      }
    );
    props.getCurrPlayback(window.localStorage.getItem('spotify_access_token'));
  };

  useEffect(() => {
    if (
      accessToken.length > 0 &&
      !window.localStorage.getItem('spotify_access_token')
    ) {
      let tokenParams = extractQueries(accessToken);
      window.localStorage.setItem(
        'spotify_access_token',
        tokenParams.access_token
      );
      window.localStorage.setItem(
        'spotify_refresh_token',
        tokenParams.refresh_token
      );
      props.getCurrPlayback(tokenParams.access_token);
      props.getRecentTrack(tokenParams.access_token);
    } else if (window.localStorage.getItem('spotify_access_token')) {
      props.getCurrPlayback(
        window.localStorage.getItem('spotify_access_token')
      );
      props.getRecentTrack(window.localStorage.getItem('spotify_access_token'));
    }
  }, []);

  useEffect(() => {
    props.getCurrPlayback(window.localStorage.getItem('spotify_access_token'));
  }, [window.localStorage.getItem('spotify_current_track')]);

  console.log(props.currPlayback);

  return (
    <div id="player">
      {window.localStorage.getItem('spotify_access_token') ? (
        <>
          <div>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {props.currPlayback
                      ? props.currPlayback?.item?.name
                      : 'Nothing is playing right now'}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {props.currPlayback?.item?.artists[0].name}
                  </Typography>
                </CardContent>
                <div className={classes.controls}>
                  <IconButton
                    aria-label="previous"
                    onClick={() => playPrevious()}
                  >
                    {theme.direction === 'rtl' ? (
                      <SkipNextIcon />
                    ) : (
                      <SkipPreviousIcon />
                    )}
                  </IconButton>
                  <IconButton
                    aria-label="play/pause"
                    onClick={() => playStart()}
                  >
                    {!props.currPlayback.is_playing ? (
                      <PlayArrowIcon className={classes.playIcon} />
                    ) : (
                      <PauseIcon className={classes.playIcon} />
                    )}
                  </IconButton>
                  <IconButton aria-label="next" onClick={() => playNext()}>
                    {theme.direction === 'rtl' ? (
                      <SkipPreviousIcon />
                    ) : (
                      <SkipNextIcon />
                    )}
                  </IconButton>
                </div>
              </div>
              <CardMedia
                className={classes.cover}
                image={`${props.currPlayback?.item?.album.images[0].url}`}
                title="album cover"
              />
            </Card>
          </div>
          <PlayerDevices currPlayback={props.currPlayback} />
          <PlayerPlaylist />
        </>
      ) : (
        <a href="http://localhost:8080/spotifyconnect">
          <Card className={classes.root}>
            <CardContent className={classes.spotifyConnect}>
              <SpotifyConnectButton>Connect to Spotify</SpotifyConnectButton>
            </CardContent>
          </Card>
        </a>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currPlayback: state.currPlayback,
    recentTrack: state.recentTrack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrPlayback: (accessToken) => {
      return dispatch(getCurrPlayback(accessToken));
    },
    getRecentTrack: (accessToken) => {
      return dispatch(getRecentTrack(accessToken));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player));
