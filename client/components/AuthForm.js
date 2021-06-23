import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { authenticate } from '../store';
import { TextField, Button } from '@material-ui/core';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error, value } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChange = (ev) => {
    if (ev.target.name === 'username') {
      setUsername(ev.target.value);
    } else if (ev.target.name === 'email') {
      setEmail(ev.target.value);
    } else if (ev.target.name === 'password') {
      setPassword(ev.target.value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let formName = 'signup';
    if (!username) {
      formName = 'login';
    }
    dispatch(authenticate(username, email, password, formName));
  };

  return (
    <div>
      {/* script for google OAuth */}
      <form onSubmit={handleSubmit} name={name} value={value}>
        {name === 'signup' ? (
          <div>
            <TextField
              id="username"
              label="Username"
              name="username"
              value={username}
              margin="normal"
              onChange={onChange}
            />
          </div>
        ) : null}
        <TextField
          id="email"
          label="E-mail"
          name="email"
          value={email}
          margin="normal"
          onChange={onChange}
        />
        {/* ??value?inputProps? */}

        <TextField
          id="password"
          label="Password"
          name="password"
          value={password}
          margin="normal"
          onChange={onChange}
        />

        <Button
          onClick={handleSubmit}
          id="submit"
          variant="contained"
          type="submit"
          value={value}
          style={{ backgroundColor: '#5061a9', color: 'white' }}
        >
          {displayName}
        </Button>
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

export const Login = connect(mapLogin)(AuthForm);
export const Signup = connect(mapSignup)(AuthForm);
