const User = require('../models/User')

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate({ path: 'friends', select: '-__v' })
      res.json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // Get a single user
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
      // .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body)
      res.json(dbUserData)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await User.deleteMany({ _id: { $in: user.thoughts } });
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