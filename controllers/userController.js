const User = require('../models/User')

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate({ path: 'friends', select: '-__v' })
      res.json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  },
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
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body)
      res.json(dbUserData)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
