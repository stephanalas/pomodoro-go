import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticateGoogle, logout, me } from '../store';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// https://react-icons.github.io/react-icons/search?q=googl

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
} from '@material-ui/core';
import { AccountBox, HomeOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button';
import axios from 'axios';

// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
const styles = () => ({
  header: { color: 'white' },
});

const responseGoogle = (response) => {
  console.log(response);
};
const Navbar = (props) => {
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [authInstance, setAuthInstance] = useState({});
  const handleSuccess = (response) => {
    console.log(response);
    props.getMe(response);
  };
  const handleFail = (response) => {
    console.log('sign in failure', response);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    window.localStorage.clear();
    props.handleClick();
  };

  const { isLoggedIn, classes } = props;

  return (
    <div>
      <nav id="navBar">
        {chrome.storage ? (
          <AppBar
            position="static"
            className={classes.header}
            style={{ backgroundColor: '#5061a9' }}
          >
            <Toolbar>
              <Typography id="pomo-go" align="center" variant="h4">
                Pomodoro,go!
              </Typography>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar
            position="static"
            className={classes.header}
            style={{ backgroundColor: '#5061a9' }}
          >
            <Toolbar>
              <IconButton
                id="home"
                aria-label="home"
                edge="start"
                size="medium"
                component={Link}
                to="/home"
              >
                <HomeOutlined style={{ color: '#e0e2e4', fontSize: 34 }} />
              </IconButton>
              <IconButton
                id="account"
                aria-label="menu"
                aria-haspopup="true"
                edge="start"
                size="medium"
                onClick={(ev) => setAnchorEl(ev.currentTarget)}
                // ref={anchorRef}
              >
                <AccountBox style={{ color: '#e0e2e4', fontSize: 30 }} />
              </IconButton>
              {/* || state.isGoogleLogedIn  */}
              {isLoggedIn ? (
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  aria-haspopup="true"
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    key="Login"
                    component={Link}
                    onClick={() => setAnchorEl(null)}
                    to="/dashboard"
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  aria-haspopup="true"
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    key="Login"
                    component={Link}
                    onClick={() => setAnchorEl(null)}
                    to="/login"
                  >
                    Log In
                  </MenuItem>
                  <MenuItem
                    key="SignUp"
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </MenuItem>
                </Menu>
              )}

              <Typography id="pomo-go" variant="h4">
                Pomodoro,go!
              </Typography>
              <span />
              <div id="extension-login">
                {props.isLoggedIn ? (
                  <GoogleLogout
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={handleLogOut}
                    isSignedIn={props.isLoggedIn}
                  ></GoogleLogout>
                ) : (
                  <GoogleLogin
                    clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={handleSuccess}
                    onFailure={handleFail}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={props.isLoggedIn}
                    redirectUri={'http://localhost:8080/home'}
                  />
                )}
              </div>
            </Toolbar>
          </AppBar>
        )}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getMe(data) {
      dispatch(authenticateGoogle(data));
    },
  };
};
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar));
