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
    const response = await axios.get('/api/sessions');
    const sessions = response.data;
    dispatch(loadSessionsActionCreator(sessions));
  };
};

const sessionsReducer = (state = [], action) => {
  if (action.type === LOAD_SESSIONS) {
    state = action.sessions;
  }
  return state;
};

export { loadSessions, sessionsReducer };
