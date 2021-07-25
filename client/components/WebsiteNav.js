import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import MainLogo from './MainLogo';
import PublicNav from './PublicNav';
import LoggedInNav from './LoggedInNav';
import GoogleAuth from './GoogleAuth';
const WebsiteNav = (props) => {
  const {
    headerStyle,
    icons,
    anchorEl,
    setAnchorEl,
    handleLogOut,
    getMe,
    isLoggedIn,
  } = props;
  return (
    <AppBar
      position="static"
      className={headerStyle}
      style={{ backgroundColor: '#5061a9' }}
    >
      <Toolbar>
        <MainLogo />
        {isLoggedIn ? (
          <LoggedInNav
            setAnchorEl={setAnchorEl}
            anchorEl={anchorEl}
            handleLogOut={handleLogOut}
            icons={icons}
          />
        ) : (
          <PublicNav anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        )}
        <GoogleAuth
          setAnchorEl={setAnchorEl}
          handleLogOut={handleLogOut}
          getMe={getMe}
          isLoggedIn={isLoggedIn}
          icons={icons}
        />
      </Toolbar>
    </AppBar>
  );
};

export default WebsiteNav;
