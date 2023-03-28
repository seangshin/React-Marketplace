const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const cartRoutes = require('./cartRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
