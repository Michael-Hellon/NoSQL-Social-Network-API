const { Thought, User } = require('../models');

// based off of the get route on problem 10

module.exports = {

// get all thoughts
  async getAllThoughts(req, res) {
    try {
    const thoughts = await Thought.find()
      .populate('users');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 

// get thoughts by ID
  async getThoughtById(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId})
        .populate('users');

      if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// create thought
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(reg.body);
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// update thoughts
  async updateThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
},
// delete thoughts
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    await User.deleteMany({ _id: { $in: course.users } });
    res.json({ message: 'thought and user deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
  },

// add reaction
  async addReaction(req, res) {
    try {
      const reaction = await Reaction.create(reg.body);
      res.json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionID });

    if (!reaction) {
      return res.status(404).json({ message: 'No reaction with that ID' });
    }

    await User.deleteMany({ _id: { $in: course.users } });
    res.json({ message: 'reaction deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
  },
}