const cookieParser = require('cookie-parser');
const express = require('express');
// logging middleware
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const app = express();
const flash = require('connect-flash');
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT,
    cookie: { maxAge: 600000 },
  })
);

module.exports = app;
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(flash());
app.use(cors());
app.use(morgan('dev'));
// body parsing middleware
app.use(express.json());
app.use(cookieParser());
// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));
app.use('/google', require('./google'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
