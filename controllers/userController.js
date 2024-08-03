// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');
const { create } = require('../models/Thought');


// Aggregate function to get the number of thoughts overall
const thoughtCount = async () => {
  const numberOfThoughts = await Thought.aggregate()
  .count('thoughtCount');
  return numberOfThoughts;
}

module.exports = {

// get all Users
  async getAllUser(req, res) {
    try {
      const users = await User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// get users by ID
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json({
      student,
      grade: await grade(req.params.studentId),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},  
    
// create users
  async createUser(req, res) {
    try {
      const user = await User.create(reg.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// update users
  // updateUser(req, res) {
  //   User.findOneAndUpdate{{}}

  //   if (!user) {
  //     return res.status(404).json({ message: 'No user with that ID' });
  //   }
  // }
  
// delete users
  async deleteUser(req, res) {
    try {
    const user = await User.findOneAndRemove({ _id: req.params.userIdm })

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    const thought = await Thought.findOneAndUpdate(
      { users: req.param.userId },
      { $pull: { users: req.params.userId} }, 
      { new: true}
    );

    if (!thought) {
      return res.status(404).json({
        message: 'User deleted, but no thoughts found',
      });
    }
      req.json({ message: 'User successfully deleted'}); 
    } catch (err) {
      console.log(err); 
      res.status(500).json(err);
    }
  },

// add reaction
  async addFriend(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);
    
    try{
      const user = await User.findOneAndUpdate(
        { _id: reg.params.userId },
        { $addToSet: { thought: req.body } },
        {runValidator: true, new: true}
      );

    if (!course) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}, 

// delete reaction
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thought: req.params.thoughtId } } },
        {runValidator: true, new: true }
      )

      if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};