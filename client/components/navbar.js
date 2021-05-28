/* global gapi */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Dropdown } from 'react-bootstrap';
import { GoogleLogIn, GoogleInfo } from './GoogleLogIn';
// https://github.com/intricatecloud/bookface-demo/blob/master/src/App.js?fbclid=IwAR1fyP0714chJ3O0OPJ4330BjJERsvyKLxvXXOjU0dMfGXfO6k_V3UhABMw

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null,
    };
  }
  // googleSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log('Name: ' + profile.getName());
  // }
  // googleSignOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('Google User signed out.');
  //   });
  // }

  // https://developers.google.com/identity/sign-in/web/reference
  insertGapiScript() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
  }

  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
            '67500047765-oj928l0bem24tr3vc71m8gmlp5ij0bre.apps.googleusercontent.com',
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          this.setState({ isSignedIn });

          authInstance.isSignedIn.listen((isSignedIn) => {
            this.setState({ isSignedIn });
          });
        });
      console.log('Api inited');
      window.gapi.load('signin2', () => {
        const params = {
          onsuccess: () => {
            console.log('User has finished signing in!');
          },
        };
        window.gapi.signin2.render('loginButton', params);
      });
    });
  }

  // https://developers.google.com/identity/sign-in/web/reference
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
  }

  render() {
    const { isLoggedIn, handleClick } = this.props;
    const { isSignedIn } = this.state;

    return (
      <div>
        <h1>Pomodoro,Go!</h1>
        <nav>
          <Link to="/home">Home</Link>
          {isSignedIn ? <GoogleInfo /> : <GoogleLogIn />}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

export default Navbar;
