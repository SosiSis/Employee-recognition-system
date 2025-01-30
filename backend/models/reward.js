const mongoose = require('mongoose');

// Define the schema for the "reward" collection
const rewardSchema = new mongoose.Schema({
 
  recognitionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecognitionType',
    required: true
  },
  rewardType: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'RewardType',
    required: true
  },
  amount: {
    type: Number,
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

// Create the "Reward" model based on the schema
const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;