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
    console.log('req.body', req.body);
    if (req.body.siteId) {
      const { siteId } = req.body;
      const block = await Block.create({
        siteId
      });
      res.send(block);
    } else if (req.body.userAttempted) {
      const matchingSite = await Site.findOne({
        where: {
          siteUrl: req.body.userAttempted
        }
      });
      if (matchingSite) {
        console.log('get site ID', matchingSite.id); //prints the site ID correctly, next create a block entry using siteID and userID
      }
    }

  } catch (err) {
    next(err);
  }
});
