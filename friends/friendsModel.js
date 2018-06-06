const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    // required: true
  },
  githubUsername: {
    type: String,
    // required: true
  },
  fbUsername: {
    type: String,
    // required: true
  },
  twitterUsername: {
    type: String,
    // required: true
  }

})

const FriendSchema = new mongoose.Schema({

  contact: ContactSchema,

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },

  createOn: {
    type: Date,
    default: Date.now()
  },

})

const friendModel = mongoose.model("Friend", FriendSchema);

module.exports = friendModel;
