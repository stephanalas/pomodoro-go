const router = require('express').Router();
const jwt = require('jsonwebtoken');
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
    const { email, name, imageUrl } = req.body.profileObj;
    const { tokenId } = req.body;
    const user = await User.findOne({ where: { googleToken: tokenId } });
    console.log('found google user', user);
    if (!user) {
      var password = generator.generate({
        length: 10,
        numbers: true,
      });

      const newUser = await User.create({
        email,
        username: name,
        password,
        googleToken: req.headers.authorization,
      });
      console.log('created new google user', newUser);
      res.sendStatus(201);
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
});
