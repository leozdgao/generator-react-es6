var router = require('express').Router();

router.use('/somemodel', require('./somemodel'));
// may be other services here

module.exports = router;
