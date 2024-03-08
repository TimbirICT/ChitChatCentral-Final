const mongoose = require('mongoose');

const { Schema } = mongoose;

const friendSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;