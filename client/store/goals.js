import axios from 'axios';
const LOAD_GOALS = 'LOAD_GOALS';

const loadGoalsActionCreator = (goals) => {
  return {
    type: LOAD_GOALS,
    goals,
  };
};

const loadGoals = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/goals');
    const goals = response.data;
    dispatch(loadGoalsActionCreator(goals));
  };
};

const goalsReducer = (state = [], action) => {
  if (action.type === LOAD_GOALS) {
    state = action.goals;
  }
  return state;
};

export { loadGoals, goalsReducer };
