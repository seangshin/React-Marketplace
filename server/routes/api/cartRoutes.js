const router = require('express').Router();
const {
  addItem,
  removeItem,
  viewCart,
  checkout,
} = require('../../controllers/cart-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user

router.route('/').post(authMiddleware, addItem);

router.route('/:bidId').delete(authMiddleware, removeItem);

router.route('/').get(authMiddleware, viewCart);

router.route('/checkout').post(checkout);

module.exports = router;
