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

const UPDATE_SITE = 'UPDATE_SITE';

const updateSiteActionCreator = (site) => {
  return {
    type: UPDATE_SITE,
    site,
  };
};

const updateSite = (siteId, siteInfo) => {
  return async (dispatch) => {
    const response = await axios.put(
      `http://localhost:8080/api/sites/${siteId}`,
      siteInfo
    );

    const { data } = response;
    dispatch(updateSiteActionCreator(data));
  };
};

const blackListReducer = (state = [], action) => {
  if (action.type === LOAD_BLACKLIST) {
    state = action.blackList;
  }
  return state;
};

export { loadBlackList, blackListReducer };
