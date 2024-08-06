// modeled after mini project
const { Schema, model, Types  } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

// has to be before ThoughtSchema to initialize
// per instructions placed inside this model
  const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
  
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
  
      username: {
        type: String,
        required: true,
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString('en-US'),
        },
      
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

  const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString('en-US'),
      }, 
      username: {
        type: String,
        required: true,
      },
  
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

  ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = model("Thought", ThoughtSchema);
  
  module.exports = Thought;