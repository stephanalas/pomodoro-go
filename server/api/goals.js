const router = require('express').Router();
const {
  models: { Goal, Task },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const goals = await Goal.findAll({
      include: [Task],
    });
    res.send(goals);
  } catch (err) {
    next(err);
  }
});

router.get('/:goalId', async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.goalId, {
      include: [Task],
    });
    res.send(goal);
  } catch (err) {
    next(err);
  }
});
