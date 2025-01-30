const mongoose = require('mongoose');

// Define the schema for the "support" collection
const supportSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  reply: {
    type: Boolean,
    default: false
  },
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

// Create the "Support" model based on the schema
const Support = mongoose.model('Support', supportSchema);

module.exports = Support;