const { Thought, User } = require('../models');

module.exports = {

// get all Users - WORKS
  async getAllUser(req, res) {
    try {
      const users = await User.find()
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })

     res.json(users)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    
  },

// get users by ID - WORKS
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },  

// create or add users - WORKS
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// update users - WORKS
  async updateUser({ params, body }, res) {
    try{
      const user = await User.findOneAndUpdate(
        { _id: params.id },
        { $set: body},
        {new: true},
      )

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
// delete users - WORKS
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const thought = await Thought.deleteMany(
        { _id: { $in: user.thoughts } }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted',
        });
      }
      res.json({ message: 'User successfully deleted'}); 
    } catch (err) {
      console.log(err); 
      res.status(500).json(err);
    }
  },

// add Friend - WORKS
  async addFriend({ params }, res) {

    try{
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidator: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 

// delete friend - WORKS
  async removeFriend({ params }, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId }  },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  
};