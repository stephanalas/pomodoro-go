import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { authenticate } from '../store';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
    width: '30vw',
    position: 'fixed',
    right: '35vw',
    top: '30vh',
  },
  item: {
    width: 200,
  },
}));

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const classes = useStyles();
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
        <Paper className={classes.login}>
          <Grid container direction="column" alignItems="center">
            <Typography style={{ color: '#808080' }}>
              Log In to Your Account
            </Typography>
            <Grid item>
              <TextField
                id="email"
                label="E-mail"
                name="email"
                value={email}
                margin="normal"
                onChange={onChange}
                variant="outlined"
                className={classes.item}
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Password"
                name="password"
                value={password}
                margin="normal"
                onChange={onChange}
                variant="outlined"
                className={classes.item}
                size="small"
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                id="submit"
                variant="contained"
                type="submit"
                value={value}
                style={{
                  backgroundColor: '#5061a9',
                  color: 'white',
                  margin: '10px',
                }}
                className={classes.item}
              >
                {displayName}
              </Button>
            </Grid>
            <Grid item>
              <Grid item>
                <Typography variant="caption" style={{ color: '#808080' }}>
                  Need an account?
                  {`
              `}
                  <Link href="http://localhost:8080/signup">Sign up</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
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
