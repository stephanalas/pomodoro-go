import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import history from './history';
import store from './store';
import App from './app';

const theme = createMuiTheme({
  palette: {
    // divider: 'rgba(145, 158, 171, 0.24)',
    // mode: 'dark',
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    error: {
      contrastText: '#ffffff',
      main: '#a83942',
    },

    primary: {
      contrastText: '#e4ddee',
      main: '#261689',
    },
    secondary: {
      contrastText: '#9FE2BF',
      main: '#5c4fa8',
    },
    success: {
      contrastText: '#ffffff',
      main: '#261689',
    },
    info:{
      main: '#ccb8b8'
    },
    text: {
      primary: '#4d2a4e',
      secondary: '#9671a2',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
