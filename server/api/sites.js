const router = require('express').Router()
const { models: { Site, User, Blacklist }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const sites = await Site.findAll({
      include: [ User ]
    });
    res.send(sites)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userSites = await Site.findAll({
      include: [ User ],
      where: {
        userId: req.params.userId
      }
    });
    res.send(userSites)
  } catch (err) {
    next(err)
  }
})
