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

const UPDATE_BLACKLIST = 'UPDATE_BLACKLIST';

const updateBlackListActionCreator = (blackList) => {
  return {
    type: UPDATE_BLACKLIST,
    blackList,
  };
};

const updateBlackList = (blackListId, blackListInfo) => {
  return async (dispatch) => {
    const response = await axios.put(
      `http://localhost:8080/api/blackList/${blackListId}`,
      blackListInfo
    );

    const { data } = response;
    dispatch(updateblackListActionCreator(data));
  };
};

const blackListReducer = (state = [], action) => {
  if (action.type === LOAD_BLACKLIST) {
    state = action.blackList;
  }
  if (action.type === UPDATE_BLACKLIST) {
    const blackLists = state.map((blackList) => {
      if (blackList.id === action.blackList.id) {
        return action.blackList;
      }
      return blackList;
    });
    state = blackLists;
  }
  return state;
};

export { loadBlackList, updateBlackList, blackListReducer };
