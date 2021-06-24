import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { FcGoogle } from 'react-icons/fc';
// https://react-icons.github.io/react-icons/search?q=googl
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
  createMuiTheme,
} from '@material-ui/core';
import { AccountBox, HomeOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button';

// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
const styles = () => ({
  header: { color: 'white' },
  icons: { color: '#9671a2' },
  login: { color: '#9671a2' },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isGoogleLogedIn: false,
      anchorEl: null,
      authInstance: {},
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
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
                className={classes.icons}
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
                className={classes.icons}
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
                  <Button
                    id="googleSignOut"
                    style={{
                      textTransform: 'none',
                      textAlign: 'center',
                    }}
                  >
                    <FcGoogle id="googleIcon" />
                    Sign Out with Google
                  </Button>
                ) : (
                  <Button
                    id="googleSignIn"
                    style={{
                      textTransform: 'none',
                      textAlign: 'center',
                    }}
                    onClick={this.handleLogIn}
                  >
                    <FcGoogle id="googleIcon" />
                    Log In with Google
                  </Button>
                )}
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
  };
};
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar));
