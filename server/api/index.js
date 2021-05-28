const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));
router.use('/sites', require('./sites'));
router.use('/google', require('./google'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
