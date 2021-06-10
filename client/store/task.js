import axios from 'axios';

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK'


const addTaskCreator = (task) => {
  return {
    type: ADD_TASK,
    task,
  };
};

const addTask = (name,sessionId) => {
  return async (dispatch) => {
    const task = await axios.post('/api/session//:sessionId/tasks',{name,sessionId}).data;

    dispatch(addTaskCreator (task));
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
    const task = await axios.delete('/api/session//:sessionId/tasks/${id}');
    dispatch(deleteTaskCreator(id));
  };}
const taskReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:return [...state,action.task]
    case DELETE_TASK:
    return state.filter(t => {return t.id !== action.task.id});
  default:
  return state;}
};

export { addTask, deleteTask,taskReducer};
