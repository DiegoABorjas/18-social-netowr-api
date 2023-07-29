const router = require('express').Router();

const {
  createThought,
  getThoughts,
  getThoughtById,
  updateThought,
  deleteThought
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/users/:id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

module.exports = router;