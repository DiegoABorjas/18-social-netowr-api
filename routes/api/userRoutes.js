const router = require('express').Router();

const {
  createUser,
  getUsers,
  getUserById,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById);


module.exports = router;