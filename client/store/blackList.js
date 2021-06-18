import axios from 'axios';
const LOAD_BLACKLIST = 'LOAD_BLACKLIST';
const loadBlackListActionCreator = (blackList) => {
  return {
    type: LOAD_BLACKLIST,
    blackList,
  };
};

const loadBlackList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080/api/blackList');
      const blackList = response.data;
      dispatch(loadBlackListActionCreator(blackList));
    } catch (error) {
      console.log('error in loadBlackList thunk');
      console.log(error);
    }
  };
};

const blackListReducer = (state = [], action) => {
  if (action.type === LOAD_BLACKLIST) {
    state = action.blackList;
  }
  return state;
};

export { loadBlackList, blackListReducer };
