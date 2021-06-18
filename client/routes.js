import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import CreateSession from './components/Timer/CreateSession';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import { me } from './store';
import { loadSessions } from './store/sessions';
import { loadBlackList } from './store/blackList';
import { loadSites, updateSite } from './store/sites';
import BlockError from './components/BlockError';
import BlockSites from './components/BlockSites';
import Player from './components/Player';

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, sites, update, auth, blackList } = this.props;

    if (auth) {
      chrome.storage.local.set({ auth: auth });
    }
    if (blackList) {
      chrome.storage.local.set({ blackList: blackList });
    }
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (changes.updatedBlackList) {
        const { newValue } = changes.updatedBlackList;
        update(newValue.id, newValue);
      }
    });

    // this adds all sites in db to chrome.storage
    if (sites) {
      const stringSites = JSON.stringify(sites);
      chrome.storage.local.set({ sites: stringSites });
    }

    // this listens for updates to one of the sites in chrome.storage and if
    // there is an update, it makes a put request to api/sites in order to
    // increment the site's 'visits' attribute by one.
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (changes.updatedSite) {
        const { newValue } = changes.updatedSite;
        update(newValue.id, newValue);
      }
    });

    return (
      <div style={{ height: '100%' }}>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Redirect to="/home" /> */}
            <Route path="/timer" exact component={CreateSession} />
            <Route exact path="/uhoh" component={BlockError} />
            <Route exact path="/blocksites" component={BlockSites} />
            {/* <Route exact path="/callback" component={Player} /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/timer" exact component={CreateSession} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    sites: state.sites,
    auth: state.auth,
    blackList: state.blackList,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(loadSessions());
      dispatch(loadSites());
      dispatch(loadBlackList());
    },
    update: (siteId, siteInfo) => {
      return dispatch(updateSite(siteId, siteInfo));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

// update: (user) => {
//   return dispatch(updateUser(user, history));
// },
