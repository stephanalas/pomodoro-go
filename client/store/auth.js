import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('http://localhost:8080/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticateGoogle = (email) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/auth/google', {
      email,
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (error) {
    console.log('error with authenticate google ');
    throw error;
  }
};

export const authenticate =
  (username, email, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/auth/${method}`,
        method === 'signup'
          ? { username, email, password }
          : { email, password }
      );
      let error;
      // if response returns error message setAuth as error
      if (res.data.message) {
        error = res.data.message;
        return dispatch(setAuth({ error }));
      }
      const { token } = res.data;
      window.localStorage.setItem(TOKEN, token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
