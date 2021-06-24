import React, { Component, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
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
  Button,
} from '@material-ui/core';
import { MenuIcon, AccountBox, HomeOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
const styles = (theme) => ({
  header: { color: 'white' },
});

const Nav = (props) => {
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [authInstance, setAuthInstance] = useState({});
  // useEffect(() => {
  //   window.localStorage.setItem('user', JSON.stringify(auth));
  // }, [auth]);
  const handleLogIn = () => {};
  const handleLogOut = () => {
    setAnchorEl(null);
    props.handleClick();
    localStorage.setItem('user', {});
  };
};
const { isLoggedIn, classes } = props;
if (!!isGoogleLoggedIn) {
  return <GLogout />;
} else {
  return (
    <div>
      <nav id="navBar">
        {chrome.storage ? (
          <AppBar position="relative" className={classes.header}>
            <Toolbar>
              <Typography variant="h4">Pomodoro,go!</Typography>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar position="relative" className={classes.header}>
            <Toolbar>
              <IconButton
                id="home"
                aria-label="home"
                edge="start"
                size="medium"
                component={Link}
                to="/home"
              >
                <HomeOutlined />
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
                <AccountBox />
              </IconButton>
              {/* || this.state.isGoogleLogedIn  */}
              {isLoggedIn ? (
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  aria-haspopup="true"
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogOut} component={Link} to="/timer">
                    Timer
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
                    Login
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

              <Typography variant="h4">Pomodoro,go!</Typography>
              {/* {isGoogleLogedIn ? <GLogout /> : <GLogin />} */}
              {isLoggedIn ? (
                <Button onClick={handleLogOut}>Sign Out</Button>
              ) : (
                <Button className="login" onClick={handleLogIn}>
                  Log In
                </Button>
              )}
            </Toolbar>
          </AppBar>
        )}
      </nav>
    </div>
  );
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
Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(mapState, mapDispatch)(withStyles(styles)(Nav));
