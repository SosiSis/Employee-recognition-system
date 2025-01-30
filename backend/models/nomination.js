const mongoose = require('mongoose');

// Define the schema for the "nomination" collection
const nominationSchema = new mongoose.Schema({
 
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
  is_anonymous: {
    type: Boolean,
    default: true
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

// Create the "Nomination" model based on the schema
const Nomination = mongoose.model('Nomination', nominationSchema);

module.exports = Nomination;