const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
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
    min: [1, 'Must be a number greater than 1'],
    max: [120, 'Must be a number less than 120'],
  },
  createdOn: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;