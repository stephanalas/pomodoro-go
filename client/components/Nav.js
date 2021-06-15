import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import GLogin from './GoogleOauth/GoogleLogIn';
import GLogout from './GoogleOauth/GoogleLogOut';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { MenuIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
const styles = (theme) => ({
  header: { color: 'white' },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoogleLOgedIn: null,
      anchorE1: null,
      authInstance: {},
    };
  }
  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          // apiKey: API_KEY,
          client_id:
            '67500047765-oj928l0bem24tr3vc71m8gmlp5ij0bre.apps.googleusercontent.com',
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          this.setState({ ...this.state, authInstance });
          const isSignedIn = authInstance.isSignedIn.get();
          this.setState({ isSignedIn });

          authInstance.isSignedIn.listen((isSignedIn) => {
            this.setState({ isSignedIn });
          });
        });
    });
  }
  // componentDidMount() {
  //   const script = document.createElement('script');
  //   script.src = 'https://apis.google.com/js/platform.js';
  //   script.onload = () => this.initializeGoogleSignIn();
  //   document.body.appendChild(script);
  // }
  render() {
    const { isLoggedIn, handleClick, classes } = this.props;
    const { isGoogleLOgedIn, anchorE1 } = this.state;
    return (
      <div>
        <nav id="navBar">
          <AppBar position="sticky" className={classes.header}>
            <Toolbar>
              <IconButton
                aria-label="menu"
                aria-haspopup="true"
                onClick={() => this.setState({ anchorE1: true })}
              >
                {isLoggedIn || this.state.isGoogleLOgedIn ? (
                  <Menu
                    id="menu"
                    anchorE1={anchorE1}
                    keepMounted
                    open={Boolean(anchorE1)}
                    onClose={() => this.setState({ anchorE1: null })}
                  >
                    <MenuItem key="Home" component={Link} to="/home">
                      Home
                    </MenuItem>
                    <MenuItem onClick={handleClick} href="#">
                      Logout
                    </MenuItem>
                  </Menu>
                ) : (
                  <Menu
                    id="menu"
                    anchorE1={anchorE1}
                    keepMounted
                    open={Boolean(anchorE1)}
                    onClose={() => this.setState({ anchorE1: null })}
                  >
                    <MenuItem key="Login" component={Link} to="/login">
                      Login
                    </MenuItem>
                    <MenuItem key="SignUp" component={Link} to="/signup">
                      Sign Up
                    </MenuItem>
                    <MenuItem key="Timer" component={Link} to="/timer">
                      Timer
                    </MenuItem>
                  </Menu>
                )}
              </IconButton>
              <Typography variant="h4">Pomodoro,go!</Typography>
              {isGoogleLOgedIn ? <GLogout /> : <GLogin />}
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
