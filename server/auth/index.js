const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;
const generator = require('generate-password');
const passport = require('passport');

router.post(
  '/login',
  (req, res, next) => {
    passport.authenticate('local', async (err, token, info) => {
      if (err) {
        return next(err);
      }

      // if there is a error with password or email
      if (token.message) {
        res.send(token);
      } else {
        // try to login with token from the passport authenticate middleware
        req.logIn(token, async () => {
          try {
            // sets user in server session
            req.session.user = await User.findByToken(token);
            // send user and token
            return res.send({
              token,
            });
          } catch (err) {
            return next(err);
          }
        });
      }
    })(req, res, next);
  }
  // passport.authenticate('local', { failureMessage: 'invalid input' }),
  // async (req, res, next) => {
  //   try {
  //     // user === token
  //     const { passport } = req.session;
  //     console.log(req.session);
  //     const token = passport.user;
  //     res.send({ token });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
);

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.post('/google', async (req, res, next) => {
  try {
    console.log('starting google authentication');
    const { email } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) {
      res.send({ token: await User.authenticate(user, 'google') });
    } else {
      const password = generator.generate({
        length: 10,
        numbers: true,
      });
      user = await User.create({ email, password });
      res.send({ token: await user.generateToken() });
    }
  } catch (error) {
    next(error);
  }
});
