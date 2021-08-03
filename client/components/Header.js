import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import MainLogo from './MainLogo';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const headersData = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Block Sites',
    href: '/blocksites',
  },
  {
    label: 'Friends',
    href: '/friends',
  },
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'Sign up',
    href: '/signup',
  },
  {
    label: 'Logout',
    href: '/',
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#5061a9',
    paddingRight: '79px',
    paddingLeft: '118px',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  logo: {
    // fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#ffffff',
    textAlign: 'left',
  },
  menuButton: {
    // fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerContainer: {
    padding: '20px 30px',
  },
}));

export default connect(({ auth }) => ({ auth }))(function Header(props) {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);
  const handleSuccess = (response) => {
    getMe(response);
  };
  const handleFail = (response) => {
    console.log('sign in failure', response);
  };
  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <MainLogo />
        <div>
          {getMenuButtons()}
          {!props.isLoggedIn ? <GoogleAuth getMe={props.getMe} /> : ''}
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <MainLogo />
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    const choices = headersData.map(({ label, href }) => {
      if (props.isLoggedIn && label === 'Logout') {
        return <MenuItem onClick={props.handleLogOut}>Logout</MenuItem>;
      } else if (!props.isLoggedIn && ['Login', 'Sign up'].includes(label))
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: 'inherit',
              style: { textDecoration: 'none' },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
    });
    if (!props.isLoggedIn) {
      choices.push(
        <GoogleLogin
          clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleSuccess}
          onFailure={handleFail}
          cookiePolicy={'single_host_origin'}
          isSignedIn={props.isLoggedIn}
          redirectUri={`${process.env.API_URL}/home`}
          // render={(renderProps) => (
          //   <Avatar
          //     onClick={renderProps.onClick}
          //     style={{
          //       height: 30,
          //       width: 30,
          //       border: 0,
          //       borderRadius: '50%',
          //     }}
          //     src="https://img-authors.flaticon.com/google.jpg"
          //   />
          // )}
        />
      );
    }
    return choices;
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      if (props.isLoggedIn && label === 'Logout') {
        return (
          <Button
            {...{
              key: label,
              color: 'inherit',
              className: menuButton,
              onClick: props.handleLogOut,
            }}
          >
            {label}
          </Button>
        );
      } else if (
        props.isLoggedIn &&
        ['Home', 'Dashboard', 'Block Sites', 'Friends'].includes(label)
      )
        return (
          <Button
            {...{
              key: label,
              color: 'inherit',
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        );
      else if (!props.isLoggedIn && ['Login', 'Sign up'].includes(label)) {
        return (
          <Button
            {...{
              key: label,
              color: 'inherit',
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        );
      }
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
});
