const router = require('express').Router();

const {
  createUser,
  getUsers,
  getSingleUser,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);


module.exports = router;