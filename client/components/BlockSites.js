import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import { Typography, FormControlLabel, Switch, Card, CardContent, CardActions, Chip, Button, TextField, Select, FormHelperText, FormControl, InputLabel, MenuItem }  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { getSites, addSite, deleteSite } from '../store/blockSites';

// material-ui style definitions
const LightGreenSwitch = withStyles({
  switchBase: {
    color: lightGreen[300],
    '&$checked': {
      color: lightGreen[500],
    },
    '&$checked + $track': {
      backgroundColor: lightGreen[500],
    },
    '& + $track': {
      backgroundColor: lightGreen[50],
      opacity: 1,
      border: 'none',
    },
  },
  checked: {},
  track: {},
})(Switch);

const LightGreenButton = withStyles((theme) => ({
  root: {
    color: lightGreen[50],
    backgroundColor: lightGreen[500],
    '&:hover': {
      backgroundColor: lightGreen[700],
    },
  },
}))(Button);

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '5px',
  },
  form: {
    maxWidth: 600,
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  textfield: {
    width: 350,
    marginRight: '10px',
  },
  button: {
    height: 55,
  },
});
//

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

//Start of component
const BlockSites = (props) => {
  console.log(props);
  //states
  const [toggleStatus, setToggleStatus] = useState({});
  console.log(toggleStatus);
  const [urlInput, setUrlInput] = useState({
    siteUrl: '',
    category: '',
  });
  //

  //style control
  const classes = useStyles();
  //

  //lifecycles
  useEffect(() => {
    props.getSites(props.auth.id);
  }, []);

  useEffect(() => {
    let result = {};
    for (let i = 0; i < props.blockedSites.length; i++) {
      result[`item${props.blockedSites[i].id}`] = true;
    }
    setToggleStatus({ ...toggleStatus, ...result });
  }, [props.blockedSites]);

  useEffect(() => {
    if (chrome.storage !== undefined) {
      blockIt();
    }
  }, [toggleStatus]);
  //

  //user interactions > change state, dispatch to store
  const handleChange = (event) => {
    setToggleStatus({
      ...toggleStatus,
      [event.target.name]: event.target.checked,
    });
  };

  const submitNewUrl = () => {
    props.addSite(urlInput, props.auth.id);
  };

  //block functionalities - chrome API
  const blockIt = () => {
    const blocked = props.blockedSites.filter((each) => {
      return toggleStatus[`item${each.id}`] === true;
    }).map((site) => {
      return site.siteUrl;
    });
    console.log(blocked);
    chrome.storage.local.set({ blocked }, function () {
      console.log('we shall block', blocked);
    });
  };

  //

  return (
    <div id='blockList'>
      {chrome.storage === undefined ? (<Alert severity='warning'>You are not using the extension - functionalities on this page would not work properly!</Alert>) : undefined}
      <Typography variant='h5' gutterBottom>
        Add sites to block list
      </Typography>
      <form id='add-site' className={classes.form}>
        <TextField
          id='standard-helperText'
          value={urlInput.siteUrl}
          label='URL'
          className={classes.textfield}
          helperText='Enter URL to block'
          variant='outlined'
          onChange={(ev) => setUrlInput({...urlInput, siteUrl: ev.target.value})}
          name='siteUrl'
        />
        <FormControl variant='outlined'>
          <InputLabel id='category-label'>Category</InputLabel>
          <Select
            labelId='category-label'
            id='category'
            name='category'
            value={urlInput.category}
            onChange={(ev) => setUrlInput({...urlInput, category: ev.target.value})}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'socialMedia'}>Social Media</MenuItem>
            <MenuItem value={'entertainment'}>Entertainment</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
          <FormHelperText>Select a category</FormHelperText>
        </FormControl>
        <LightGreenButton
          variant='contained'
          startIcon={<AddIcon />}
          className={classes.button}
          onClick={submitNewUrl}
        >
          Add
        </LightGreenButton>
      </form>
      <Typography variant='h5' gutterBottom>
        Sites you already blocked
      </Typography>
      <div id='currBlocked'>
        {props.blockedSites.length > 0 && props.blockedSites.map((each, idx) => {
          return (
            <Card className={classes.root} key={each.id} variant='outlined'>
              <CardContent>
                <Typography variant='body1'>
                  Site URL: {each.siteUrl}
                </Typography>
              </CardContent>
              <CardActions>
                <Chip label={each.category} variant='outlined' />
                <FormControlLabel
                  control={
                    <LightGreenSwitch
                      checked={
                        toggleStatus[`item${each.id}`] !== undefined
                          ? toggleStatus[`item${each.id}`]
                          : true
                      }
                      onChange={handleChange}
                      name={`item${each.id}`}
                    />
                  }
                  label='Blocked'
                />
                <LightGreenButton
                  variant='contained'
                  startIcon={<DeleteIcon />}
                  onClick={() => props.deleteSite(props.auth.id, each.id)}
                >
                  Delete
                </LightGreenButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    blockedSites: state.blockedSites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSites: (userId) => {
      dispatch(getSites(userId));
    },
    addSite: (site, userId) => {
      dispatch(addSite(site, userId));
    },
    deleteSite: (userId, siteId) => {
      dispatch(deleteSite(userId, siteId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockSites);
