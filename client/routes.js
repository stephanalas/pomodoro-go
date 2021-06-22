import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import CreateSession from './components/Timer/CreateSession';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import { me } from './store';
import { loadSessions } from './store/sessions';
import { loadBlackList, updateBlackList } from './store/blackList';
import { loadSites, updateSite } from './store/sites';
import BlockError from './components/BlockError';
import BlockSites from './components/BlockSites';
import Player from './components/Player';
import Friends from './components/Friends/Friends';
import Intro from './components/Intro';

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, auth, blackList, updateB } = this.props;
    //this enters auth and blackList into chrome.storage so it can be accessed
    //in background.js file
    if (auth) {
      if (chrome.storage) chrome.storage.local.set({ auth: auth });
    }
    if (blackList) {
      if (chrome.storage) chrome.storage.local.set({ blackList: blackList });
    }
    //this listens for changes in chrome.storage so that it can update the database
    // with the updated blacklist info
    if (chrome.storage)
      chrome.storage.onChanged.addListener(async (changes, areaName) => {
        if (changes.updatedBlackList) {
          const {
            updatedBlackList: { oldValue, newValue },
          } = changes;
          if (!oldValue) {
            updateB(newValue.id, newValue);
          } else if (oldValue.blocks !== newValue.blocks) {
            updateB(newValue.id, newValue);
          }
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
            <Route exact path="/blocksites" component={BlockSites} />
            <Route exact path="/friends" component={Friends} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Intro} />
            <Route path="/" exact component={Login} />
            <Route path="/timer" exact component={CreateSession} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/uhoh" component={BlockError} />
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

    updateB: (blackListId, blackListInfo) => {
      return dispatch(updateBlackList(blackListId, blackListInfo));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

// update: (user) => {
//   return dispatch(updateUser(user, history));
// },
