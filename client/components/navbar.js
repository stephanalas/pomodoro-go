/* global gapi */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { logout } from '../store';
import { GoogleLogIn, GoogleInfo } from './GoogleLogIn';
import API_KEY from '../secret';
// https://github.com/intricatecloud/bookface-demo/blob/master/src/App.js?fbclid=IwAR1fyP0714chJ3O0OPJ4330BjJERsvyKLxvXXOjU0dMfGXfO6k_V3UhABMw

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null,
    };
  }

  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          apiKey: API_KEY,
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
      // .grantOfflineAccess();
      //About grantOfflineAccess:
      // https://developers.google.com/identity/sign-in/web/reference
      console.log('Api inited');
      // window.gapi.load('signin2', () => {
      //   const params = {
      //     onsuccess: () => {
      //       console.log('User has finished signing in!');
      //     },
      //   };
      //   window.gapi.signin2.render('loginButton', params);
      // });
    });
  }

  // https://developers.google.com/identity/sign-in/web/reference
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
  }

  ifUserSignedIn(G) {
    if (this.state.isSignedIn === null) {
      return <h1>Checking if you're signed in with Google Account...</h1>;
    }
    return this.state.isSignedIn ? <G /> : <GoogleLogIn />;
  }
  render() {
    const { isLoggedIn, handleClick } = this.props;

    return (
      <div>
        <h1>Pomodoro,Go!</h1>
        <nav id="navBar">
          <Route
            // path="/google"
            render={() => this.ifUserSignedIn(GoogleInfo)}
          />
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
