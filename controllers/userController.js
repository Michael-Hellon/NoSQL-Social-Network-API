const { Thought, User } = require('../models');

module.exports = {

// get all Users
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

// get users by ID
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        // .populate({
        //   path: "thoughts",
        //   select: "-__v",
        // })
        // .populate({
        //   path: "friends",
        //   select: "-__v",
        // })
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
    
// create or add users
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// update users
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
  
// delete users
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

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

// add Friend
  async addFriend({params}, res) {
    console.log('You are adding a friend');
    console.log(params.friendId);
    
    try{
      const user = await User.findOneAndUpdate(
        { _id: reg.params.userId },
        { $addToSet: { friends: reg.params.friendId } },
        {runValidator: true, new: true}
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 

// delete friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
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