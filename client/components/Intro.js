import React, { Component } from 'react';
import Typical from 'react-typical';
import { makeStyles } from '@material-ui/core';


export default class Intro extends Component {
  render() {
    return (
        <div id='Intro'>
      <Typical 
        steps={[
          'Hi,this is the App that helps boots your work effecientcy by blocking time-wasting websites and bringing in your favorite music.Come set the goal,hit the road!',
          800,
        ]}
        loop={Infinity}
        wrapper="b"
      />
      </div>
    );
  }
}