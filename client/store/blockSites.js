import axios from 'axios'
import history from '../history'

const GET_SITES = 'GET_SITES'
const ADD_SITE = 'ADD_SITE'
const DELETE_SITE = 'DELETE_SITE'

//get sites
export const getSites = (userId) => {
  return async(dispatch) => {
    try {
      const currentUser = (await axios.get(`http://localhost:8080/api/users/${userId}`)).data;
      const blockedSites = currentUser.sites;
      dispatch(_getSites(blockedSites));
    } catch (err) {
      console.log(err);
    }
  }
}

const _getSites = (blockedSites) => {
  return {
    type: GET_SITES,
    blockedSites
  }
}

//add new site
export const addSite = (site, userId) => {
  return async(dispatch) => {
    try {
      const newSite = (await axios.post('http://localhost:8080/api/sites',{...site,userId: userId})).data;
      dispatch(getSites(userId));
    } catch (err) {
      console.log(err);
    }
  }
}

//delete a site from a user
export const deleteSite = (userId, siteId) => {
  console.log('userId', userId, 'siteId', siteId)
  return async(dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/api/sites/${userId}/${siteId}`);
      dispatch(getSites(userId));
    } catch (err) {
      console.log(err)
    }
  }
}

const blockedSitesReducer = (state = [], action) => {
  if (action.type === GET_SITES) {
    return (state = action.blockedSites)
  }
  return state;
}

export default blockedSitesReducer;