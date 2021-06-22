import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { TextField, Button } from '@material-ui/core';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ margin: '0px auto' }}>
      {/* script for google OAuth */}
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <TextField
              id="username"
              label="Username"
              name="username"
              value={username}
              margin="normal"
            />
            {/* onChange={(e)=>setUsername(e)}inputProps={username} */}
          </div>
        ) : null}
        <div>
          <TextField
            id="email"
            label="E-mail"
            name="email"
            value={email}
            margin="normal"
          />
          {/* ??value?inputProps?onChange={(e)=>{setEmail(e)}} */}
          <br />
          <TextField
            id="password"
            label="Password"
            name="password"
            value={password}
            margin="normal"
          />
          {/*onChange={(e)=>{setPassword(e)}} inputProps={password}*/}
          <br />
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
            id="submit"
            variant="contained"
            type="submit"
            style={{ backgroundColor: '#5061a9', color: 'white' }}
          >
            {displayName}
          </Button>
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
