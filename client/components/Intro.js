import React, { Component } from 'react';
import Typical from 'react-typical';

export default class Intro extends Component {
  render() {
    return (
      <div id="Intro">
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
      </div>
    );
  }
}
