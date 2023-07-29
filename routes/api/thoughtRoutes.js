const router = require('express').Router();

const {
  createThought,
  getThoughts,
  getThoughtById,
} = require('../../controllers/thoughtController.js');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:id
router.route('/:id').get(getThoughtById);

module.exports = router;