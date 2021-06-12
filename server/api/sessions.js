const router = require('express').Router();
const {
  models: { Session, User },
} = require('../db');
const Task = require('../db/models/Task');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      include: [{ model: User }],
    });
    res.send(sessions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, goal } = req.body;
    const createdSession = await Session.create({ userId, goal });
    const eagerLoadedSession = await Session.findOne({
      where: { id: createdSession.id },
      include: [User, Task],
    });
    res.status(201).send(eagerLoadedSession);
  } catch (error) {
    next(error);
  }
});

router.get('/:sessionId', async (req, res, next) => {
  try {
    console.log('sessions get route');
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
    const { sessionTime, goal } = req.body;
    const { sessionId } = req.params;
    const session = await Session.findByPk(sessionId);
    session.goal = goal;
    if (sessionTime) {
      session.sessionTime = sessionTime;
    }
    await session.save();
    res
      .status(200)
      .send(await Session.findByPk(sessionId, { include: [User, Task] }));
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

router.post('/:sessionId/tasks', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { task } = req.body;
    await Task.create({ name: task, sessionId });

    const session = await Session.findOne({
      where: { id: sessionId },
      include: [User, Task],
    });
    res.status(201).send(session);
  } catch (error) {
    next(error);
  }
});

router.put('/:sessionId/tasks/:taskId', async (req, res, next) => {
  try {
    const { taskId, sessionId } = req.params;
    const task = await Task.findOne({ where: { sessionId, id: taskId } });
    task.completed = !task.completed;
    await task.save();
    res.send(await Session.findByPk(sessionId, { include: [User, Task] }));
  } catch (err) {
    next(err);
  }
});

router.delete('/:sessionId/tasks/:taskId', async (req, res, next) => {
  try {
    const { taskId, sessionId } = req.params;
    console.log(taskId, sessionId);
    const deleteTask = await Task.findByPk(taskId);
    await deleteTask.destroy();
    const session = await Session.findOne({
      where: { id: sessionId },
      include: [User, Task],
    });
    console.log(session);
    res.send(session);
  } catch (error) {
    next(error);
  }
});

router.put('/:sessionId/tasks/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { name } = req.body;
    const updateTask = await Task.update({ name });
    const session = await Session.findOne({
      where: { id: sessionId },
      include: [User, Task],
    });
    res.status(204).send(session);
  } catch (error) {
    next(error);
  }
});
