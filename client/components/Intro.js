import { Paper } from '@material-ui/core';
import React, { Component } from 'react';
import Typical from 'react-typical';

const Intro = () => {
  
  return (
    <div className="paper">
  <div className="lines">
    <div className="text">
        <Typical
          steps={[
            'Hello!',
            1000,
            'This is the App that helps boot your work effeciency by blocking time-wasting websites and bringing in your favorite music. Come set the goal and hit the road!',
            600,
          ]}
            // loop={3}
          wrapper="b"
        />
    </div>
    </div>  
    <div className="holes hole-top"></div>
  <div className="holes hole-middle"></div>
  <div className="holes hole-bottom"></div>
    </div>
  );
};

export default Intro;
