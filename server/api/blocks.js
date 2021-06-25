const router = require('express').Router();
const {
  models: { Site, Block, User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const blocks = await Block.findAll({
      include: [User, Site],
    });
    res.send(blocks);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { siteId } = req.body;
    const block = await Block.create({
      siteId
    });
    res.send(block);
  } catch (err) {
    next(err);
  }
});
