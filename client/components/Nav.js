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
  Button,
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
                <Menu
                  id="menu"
                  // anchorE1={anchorE1}
                  keepMounted
                  open={Boolean(anchorE1)}
                  onClose={() => this.setState({ anchorE1: null })}
                >
                  {isLoggedIn ? (
                    <>
                      <MenuItem containerElement={<Link to="/home" />}>
                        Home
                      </MenuItem>{' '}
                      <MenuItem containerElement={<Link to="/timer" />}>
                        Timer
                      </MenuItem>
                      <MenuItem onClick={handleClick}>Logout</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem containerElement={<Link to="/login" />}>
                        Login
                      </MenuItem>
                      <MenuItem containerElement={<Link to="/signup" />}>
                        Sign Up
                      </MenuItem>
                    </>
                  )}
                </Menu>
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
