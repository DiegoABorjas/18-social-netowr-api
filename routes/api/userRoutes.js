const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

module.exports = router;