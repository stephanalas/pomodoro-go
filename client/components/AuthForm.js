import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
// import {Grid} from '@material-ui/core'
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  // https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/?fbclid=IwAR35rEtHBMba3V9KIiFiGhTltoYectdaDdkKTSx7YnP8aN-SeWqCFFuvaW8

  return (
    <div>
      {/* script for google OAuth */}
      {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
        ) : null}
        <div>
          <label htmlFor="email">
            <small>E-mail</small>
          </label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      let username = null;
      if (formName === 'signup') username = evt.target.username.value;

      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
