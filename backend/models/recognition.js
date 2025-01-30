const mongoose = require('mongoose');

// Define the schema for the "recognition" collection
const recognitionSchema = new mongoose.Schema({
  
  nomineeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  nominatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  recognitionTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecognitionType',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
    required: true
  }
});

// Create the "Recognition" model based on the schema
const Recognition = mongoose.model('Recognition', recognitionSchema);

module.exports = Recognition;