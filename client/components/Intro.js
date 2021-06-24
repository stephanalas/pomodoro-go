import { Paper } from '@material-ui/core';
import React, { Component } from 'react';
import Typical from 'react-typical';

const Intro = () => {
  const paperStyle = {
    height: '20vh',
    width: 360,
    padding: '50px',
    margin: '100px',
    backgroundColor: '#414e87',
    color: 'white',
    lineHeight: '30px',
    fontSize: 'larger',
  };
  return (
    <div id="Intro">
      <Paper style={paperStyle}>
        <Typical
          steps={[
            'Hello!',
            1000,
            'This is the App that helps boots your work effecientcy by blocking time-wasting websites and bringing in your favorite music.Come set the goal,hit the road!',
            600,
          ]}
          //   loop={Infinity}
          wrapper="b"
        />
      </Paper>
    </div>
  );
};

export default Intro;
