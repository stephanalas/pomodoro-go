/* global gapi */
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
  MakeStyles,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
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
      authInstance: {},
    };
  }

  render() {
    const { isLoggedIn, handleClick, classes } = this.props;
    const { isGoogleLOgedIn } = this.state;
    return (
      <div>
        <nav id="navBar">
          <AppBar position="sticky" className={classes.header}>
            <Toolbar>
              <IconButton>
                <Menu />
                {/* {isLoggedIn ?<Link to="/home">Home</Link>
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>: <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/timer">Timer</Link> */}
              </IconButton>
              <Typography variant="h4">Pomodoro,go!</Typography>
              {isGoogleLOgedIn ? <GLogout /> : <GLogin />}
            </Toolbar>
          </AppBar>
        </nav>
        <hr />
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
