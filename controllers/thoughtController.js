const { Thought, User } = require('../models');

module.exports = {

// get all thoughts - WORKS
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find()

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 

// get thoughts by ID - WORKS
  async getThoughtById(req, res) {
    try {
      const thoughts = await Thought.findOne(
        { _id: req.params.id})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")

      if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// create / add thought - WORKS
async createThought(req, res) {
  try {
    const thoughts = await Thought.create(req.body);
    const userData = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: {thoughts: thoughts._id  } },
      { runValidators: true, new: true }
    );
    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thoughts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

// update thoughts - WORKS
  async updateThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// delete thoughts - WORKS
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({ _id: req.params.id });

    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.status(200).json({ message: 'thought and user deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
  },

// add reaction
  async addReaction({ params, body }, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true, }
      );
      
      if (!reaction) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
  
      res.status(200).json({ message: 'Reaction added'});

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// delete reaction
  async deleteReaction({ params },res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )

      if (!reaction) {
      return res.status(404).json({ message: 'No reaction with that ID' });
    }

    res.json({ message: 'reaction deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
  },
}