const { Thought, User } = require('../models')

module.exports = {

  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate({ path: 'reactions', select: '-__v' })
      res.json(thoughts)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  
  // get a single thought
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
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

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'Thoughts and users deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
