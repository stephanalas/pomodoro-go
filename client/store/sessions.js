import axios from 'axios';
const LOAD_SESSIONS = 'LOAD_SESSIONS';
const loadSessionsActionCreator = (sessions) => {
  return {
    type: LOAD_SESSIONS,
    sessions,
  };
};

const loadSessions = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/sessions');
      const sessions = response.data;
      dispatch(loadSessionsActionCreator(sessions));
    } catch (error) {
      console.log('error in loadSessions thunk');
      console.log(error);
    }
  };
};

const sessionsReducer = (state = [], action) => {
  if (action.type === LOAD_SESSIONS) {
    state = action.sessions;
  }
  return state;
};

const CREATE_SESSION = 'CREATE_SESSION';
const UPDATE_SESSION = 'UPDATE_SESSION';

const createSessionActionCreator = (session) => {
  return {
    type: CREATE_SESSION,
    session,
  };
};
const createSession = (userId) => async (dispatch) => {
  try {
    const response = await axios.post('/api/sessions', { userId });
    const { data } = response;
    dispatch(createSessionActionCreator(data));
  } catch (error) {
    console.log('error in createSession thunk');
    console.log(error);
  }
};
const updateSessionActionCreator = (session) => {
  return {
    type: UPDATE_SESSION,
    session,
  };
};
const updateSession = (sessionId, sessionTime) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/sessions/${sessionId}`, {
      sessionTime,
    });
    const { data } = response;
    dispatch(updateSessionActionCreator(data));
  } catch (error) {
    console.log('error in updateSession thunk');
    console.log(error);
  }
};

const currentSessionReducer = (state = {}, action) => {
  if (action.type === CREATE_SESSION || action.type === UPDATE_SESSION) {
    state = action.session;
  }
  return state;
};

export {
  loadSessions,
  sessionsReducer,
  currentSessionReducer,
  createSession,
  updateSession,
};
