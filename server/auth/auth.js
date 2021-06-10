const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const {
  models: { User },
} = require('../db');
passport.use(
  'jwt',
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT,
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    },
    async (token, done) => {
      try {
        console.log(token);
        User.findOne({ id: token.sub }, function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            console.log(user);
            return done(null, user);
          }
          console.log('no user exist or maybe error');
          return done(null, false);
        });
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ where: { email: username } }).then(async (user) => {
      try {
        console.log('starting local strat');
        if (!user) {
          console.log('no user found');
          return done(null, false, { message: 'Email not found' });
        } else if (!(await user.correctPassword(password))) {
          console.log('bad password');
          return done(null, false, { message: 'Incorrect password' });
        } else {
          console.log('found user');
          console.log(username, password);
          return done(null, await user.generateToken());
        }
      } catch (error) {
        console.log('error from local strategy authentication', error);
        done(error, false);
      }
    });
  })
);

passport.serializeUser((token, done) => {
  done(null, token);
});

passport.deserializeUser(async (token, done) => {
  try {
    done(null, await User.findByToken(token));
  } catch (error) {
    done(error, false);
  }
});
module.exports = passport;
