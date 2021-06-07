const router = require('express').Router();
const {
  models: { Session, User, Goal },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      include: [{ model: User }, { model: Goal }],
    });
    res.send(sessions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId } = req.body;
    const session = await Session.create({ userId });
    res.status(201).send(session);
  } catch (error) {
    next(error);
  }
});

router.get('/:sessionId', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.sessionId, {
      include: [User],
    });
    res.send(session);
  } catch (err) {
    next(err);
  }
});

router.put('/:sessionId', async (req, res, next) => {
  try {
    const { sessionTime } = req.body;
    const session = await Session.findByPk(req.params.sessionId);
    session.sessionTime = sessionTime;
    await session.save();
    res.status(200).send(session);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userSessions = await Session.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.send(userSessions);
  } catch (err) {
    next(err);
  }
});
