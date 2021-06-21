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
import { MenuIcon, AccountBox, HomeOutlined } from '@material-ui/icons';
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
      isGoogleLogedIn: false,
      anchorEl: null,
      authInstance: {},
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    this.setState({ anchorEl: null });
    this.props.handleClick();
  }
  render() {
    const { isLoggedIn, classes } = this.props;
    const { isGoogleLogedIn, anchorEl } = this.state;
    if (!!isGoogleLogedIn) {
      return <GLogout />;
    }

    return (
      <div>
        <nav id="navBar">
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
                onClick={(ev) => this.setState({ anchorEl: ev.currentTarget })}
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
                  onClose={() => this.setState({ anchorEl: null })}
                >
                  <MenuItem
                    onClick={this.handleLogOut}
                    component={Link}
                    to="/timer"
                  >
                    Timer
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
                    Login
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

              <Typography variant="h4">Pomodoro,go!</Typography>
              {isGoogleLogedIn ? <GLogout /> : <GLogin />}
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
