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

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK'

const addTaskCreator = (session) => {
  return {
    type: ADD_TASK,
    session,
  };
};

const addTask = (task,sessionId) => {
  return async (dispatch) => {
    const updatedSession = await axios.post(`/api/session/${sessionId}/tasks`,{task}).data;

    dispatch(addTaskCreator (updatedSession));
  };
};
const deleteTaskCreator = (id) => {
  return {
    type: DELETE_TASK,
    id
  };
};

const deleteTask = (id) => {
  return async (dispatch) => {
    const task = await axios.delete(`/api/session//:sessionId/tasks/${id}`);
    dispatch(deleteTaskCreator(id));
  };}
const currentSessionReducer = (state = {}, action) => {
  if (action.type === CREATE_SESSION || action.type === UPDATE_SESSION || action.type === ADD_TASK) {
    state = action.session;
  }
  if(action.type===DELETE_TASK){return state.filter(t => {return t.id !== action.session.id})

  }
  return state;
};

export {
  loadSessions,
  sessionsReducer,
  currentSessionReducer,
  addTask,
  deleteTask,
  createSession,
  updateSession,
};
