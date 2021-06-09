/* global gapi */
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authenticateGoogle, logout } from '../store/auth';
// https://github.com/intricatecloud/bookface-demo/blob/master/src/App.js

export function GoogleInfo() {
  const authInstance = window.gapi.auth2.getAuthInstance();
  const user = authInstance.currentUser.get();
  const profile = user.getBasicProfile();
  const email = profile.getEmail();
  // const imageUrl = profile.getImageUrl();
  const [userInDB, setUserInDB] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInDB) {
      console.log('attempting to login in google account');
      dispatch(authenticateGoogle(email));
      setUserInDB(true);
    }
  }, [dispatch]);
  const handleClick = (ev) => {
    if (window.localStorage.getItem('token')) {
      dispatch(logout());
    }
    authInstance.signOut();
  };
  return (
    <div id="googleInfo">
      {/* <img className="push" src={imageUrl} /> */}
      <Dropdown>
        <Dropdown.Toggle as="a">{email}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleClick}>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export class GoogleLogIn extends Component {
  componentDidMount() {
    window.gapi.load('signin2', () => {
      window.gapi.signin2.render('login-button', { width: 50, height: 50 });
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
