const mongoose = require('mongoose');

// Define the schema for the "rewardType" collection
const rewardTypeSchema = new mongoose.Schema({
  
  rewardType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Create the "RewardType" model based on the schema
const RewardType = mongoose.model('RewardType', rewardTypeSchema);

module.exports = RewardType;