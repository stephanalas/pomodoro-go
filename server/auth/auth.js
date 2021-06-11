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
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        console.log('starting local strat');

        // checking to see if there is a user
        const user = await User.findOne({ where: { email: username } });

        if (!user) {
          // returns email not found message as user

          return done(null, { message: 'Email not found' });
        } else if (!(await user.correctPassword(password))) {
          console.log('bad password');
          // returns incorrect password message as useer
          return done(null, { message: 'Incorrect password' });
        } else {
          console.log('found user');
          // generates users token
          return done(null, await user.generateToken());
        }
      } catch (error) {
        console.log('error from local strategy authentication', error);
        done(error, false);
      }
    }
  )
);
// const GoogleStrategy = require('passport-google-oauth2').Strategy;

// passport.use(
//   new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:8080/auth/google/callback',
//     passReqToCallback: true,
//   }),
//   (request, accessToken, refreshToken, profile, done) => {}
// );

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
