import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import CreateSession from './components/CreateSession';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import { me } from './store';
import { loadSessions } from './store/sessions';
import BlockError from './components/BlockError';
import BlockSites from './components/BlockSites';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

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
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      console.log('inside loadInitialData');
      dispatch(me());
      dispatch(loadSessions());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
