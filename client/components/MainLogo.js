import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
const MainLogo = () => {
  return (
    <div id="logo" style={{ display: 'flex', flexFlow: 'row' }}>
      <Avatar
        src={
          'https://e7.pngegg.com/pngimages/499/436/png-clipart-logo-tomato-app-store-fruit-scribbles-tomato-logo.png'
        }
      />
      <Typography
        id="pomo-go"
        variant="h4"
        style={{ fontFamily: 'Righteous', paddingLeft: '1rem' }}
      >
        Pomodoro,go!
      </Typography>
    </div>
  );
};

export default MainLogo;
