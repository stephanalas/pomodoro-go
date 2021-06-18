const router = require('express').Router();
const {
  models: { BlackList, User, Site },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const blacklist = await BlackList.findAll({ include: [User, Site] });
    res.send(blacklist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
