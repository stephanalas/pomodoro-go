import axios from 'axios';
import history from '../history';

const TOKEN = 'token';
const SPOTIFY_ACCESS_TOKEN = 'spotify_access_token';
const SPOTIFY_REFRESH_TOKEN = 'spotify_refresh_token';
const NEW_SPOTIFY_DEVICE = 'new-spotify-device';
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

export const authenticateGoogle = (email) => async dispatch => {
  try {

    const res = await axios.post('http://localhost:8080/auth/google', { email })
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (error) {
    console.log('error with authenticate google ')
    throw error
  }
};

export const authenticate = (username, email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:8080/auth/${method}`, method === 'signup' ? {username, email, password} : { email, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
  window.localStorage.removeItem(SPOTIFY_REFRESH_TOKEN);
  window.localStorage.removeItem(NEW_SPOTIFY_DEVICE);
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
