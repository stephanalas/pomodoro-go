import React, { Component } from 'react';
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
import Timer from './Timer/Timer';

// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
const styles = () => ({
  header: { color: 'white' },
});

const responseGoogle = (response) => {
  console.log(response);
};
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isGoogleLogedIn: false,
      anchorEl: null,
      authInstance: {},
    };
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }
  handleSuccess(response) {
    console.log(response);
    this.props.getMe(response);
  }
  handleFail(response) {
    console.log('sign in failure', response);
  }
  handleLogIn() {
    if (chrome.storage) {
      chrome.storage.sync.get(['user'], (result) => {
        console.log('onClick handler', result);
      });
    }
  }
  handleLogOut() {
    this.setState({ anchorEl: null });

    this.props.handleClick();
  }

  render() {
    const { isLoggedIn, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <nav id="navBar">
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
                onClick={(ev) => this.setState({ anchorEl: ev.currentTarget })}
                // ref={anchorRef}
              >
                <AccountBox style={{ color: '#e0e2e4', fontSize: 30 }} />
              </IconButton>
              {/* || this.state.isGoogleLogedIn  */}
              {isLoggedIn ? (
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  aria-haspopup="true"
                  onClose={() => this.setState({ anchorEl: null })}
                >
                  <MenuItem
                    key="Login"
                    component={Link}
                    onClick={() => this.setState({ anchorEl: null })}
                    to="/dashboard"
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  aria-haspopup="true"
                  onClose={() => this.setState({ anchorEl: null })}
                >
                  <MenuItem
                    key="Login"
                    component={Link}
                    onClick={() => this.setState({ anchorEl: null })}
                    to="/login"
                  >
                    Log In
                  </MenuItem>
                  <MenuItem
                    key="SignUp"
                    onClick={() => this.setState({ anchorEl: null })}
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
              {/* {isGoogleLogedIn ? <GLogout /> : <GLogin />} */}
              <span />
              <div id="extension-login">
                {this.props.isLoggedIn ? (
                  <GoogleLogout
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.handleLogOut}
                    isSignedIn={this.props.isLoggedIn}
                  ></GoogleLogout>
                ) : (
                  <GoogleLogin
                    clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.handleSuccess}
                    onFailure={this.handleFail}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={this.props.isLoggedIn}
                    redirectUri={'http://localhost:8080/home'}
                  />
                )}
                <Link to="/timer">Timer</Link>
              </div>
            </Toolbar>
          </AppBar>
        </nav>
      </div>
    );
  }
}

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
