const router = require('express').Router();

//Import modular routers for this application
const apiRoutes = require('./api');

router.use('/api', apiRoutes);


module.exports = router;