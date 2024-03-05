const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;