const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;
const generator = require('generate-password');

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

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
