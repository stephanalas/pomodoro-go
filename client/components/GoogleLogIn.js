/* global gapi */
import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
// https://github.com/intricatecloud/bookface-demo/blob/master/src/App.js

export function GoogleInfo() {
  const authInstance = window.gapi.auth2.getAuthInstance();
  const user = authInstance.currentUser.get();
  const profile = user.getBasicProfile();
  const email = profile.getEmail();
  // const imageUrl = profile.getImageUrl();

  return (
    <div id="googleInfo">
      {/* <img className="push" src={imageUrl} /> */}
      <Dropdown>
        <Dropdown.Toggle as="a">{email}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={authInstance.signOut}>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export class GoogleLogIn extends Component {
  componentDidMount() {
    window.gapi.load('signin2', () => {
      window.gapi.signin2.render('login-button');
    });
  }

  render() {
    return (
      <div id="GoogleContainer">
        <div id="login-button">Sign in with Google</div>
      </div>
    );
  }
}
