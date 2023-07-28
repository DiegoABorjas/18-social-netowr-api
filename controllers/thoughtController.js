const { Thought, User } = require('../models')

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate({ path: 'reactions', select: '-__v' })
      res.json(thoughts)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.userId })
      .populate({ path: 'reactions', select: '-__v' })
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json(thought)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body)
      res.json(dbThoughtData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
