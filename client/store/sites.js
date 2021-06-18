import axios from 'axios';
const LOAD_SITES = 'LOAD_SITES';
const loadSitesActionCreator = (sites) => {
  return {
    type: LOAD_SITES,
    sites,
  };
};

const loadSites = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080/api/sites');
      const sites = response.data;
      dispatch(loadSitesActionCreator(sites));
    } catch (error) {
      console.log('error in loadSites thunk');
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
//fix this to match my updateUser from Grace Shopper
const updateSite = (siteId, siteInfo) => {
  return async (dispatch) => {
    console.log('siteId:', siteId);
    console.log('siteInfo:', siteInfo);
    const response = await axios.put(
      `http://localhost:8080/api/sites/${siteId}`,
      siteInfo
    );
    console.log('response in updateSite:', response);
    const { data } = response;
    dispatch(updateSiteActionCreator(data));
  };
};

const sitesReducer = (state = [], action) => {
  if (action.type === LOAD_SITES) {
    state = action.sites;
  }
  if (action.type === UPDATE_SITE) {
    const sites = state.map((site) => {
      if (site.id === action.site.id) {
        return action.site;
      }
      return site;
    });
    state = sites;
  }
  return state;
};

export { loadSites, updateSite, sitesReducer };
