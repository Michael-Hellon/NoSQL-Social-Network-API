// modeled after mini project
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
    type: String,
    unique: true,
    required: "Username is Required",
    trim: true,
    },
    
    email: {
    type: String,
    required: "Username is Required",
    unique: true,
    match: [/.+@.+\..+/],
    },
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// virtual based off of problem 21
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  const User = model("User", userSchema);

  module.exports = User;