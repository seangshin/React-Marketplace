const router = require('express').Router();
const {
  getAllItems,
  getMyItems,
  createItem,
  deleteItem,
} = require('../../controllers/item-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
const upload = require('../../config/multer');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllItems);

router.route('/profile').get(authMiddleware, getMyItems);

router.route('/').post(authMiddleware, upload, createItem);

router.route('/:itemId').delete(authMiddleware, deleteItem);

module.exports = router;