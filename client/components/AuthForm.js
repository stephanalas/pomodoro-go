import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { TextField, Button, Paper, Grid } from '@material-ui/core';
// import {AccountBoxIcon,EmailIcon,LockIcon} from '@material-ui/icons';

// COMPONENT

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const paperStyle = {
    padding: 20,
    height: '32vh',
    width: 180,
    margin: '30px auto',
    backgroundColor: '#e0e2e4',
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          {/* script for google OAuth */}
          <form onSubmit={handleSubmit} name={name}>
            {name === 'signup' ? (
              <div>
                <input name="username" placeholder="Username" type="text" />
              </div>
            ) : null}
            <div>
              <input name="email" type="email" placeholder="E-mail" />
            </div>
            <div>
              <input name="password" type="password" placeholder="Password" />
            </div>
            <div>
              <button id="login-signin-button" type="submit">
                {displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </Paper>
      </Grid>
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
    displayName: 'Log In',
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
