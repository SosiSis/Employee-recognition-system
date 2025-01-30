const mongoose = require('mongoose');

// Define the schema for the "recognitionType" collection
const recognitionTypeSchema = new mongoose.Schema({
  
  recognitionType: {
    type: String,
    required: true
  },
  eligiblePosition: {
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
  active_for_nomination: {
    type: Boolean,
    default: false
  },
  active_for_approvement: {
    type: Boolean,
    default: false
  }
});

// Create the "RecognitionType" model based on the schema
const RecognitionType = mongoose.model('RecognitionType', recognitionTypeSchema);

module.exports = RecognitionType;