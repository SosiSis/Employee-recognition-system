const mongoose = require('mongoose');

// Define the schema for the "approvalDate" collection
const nominationDateSchema = new mongoose.Schema({
 
  recognitionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecognitionType',
    required: true
  },
  nominationStartDate: {
    type: Date,
    default:Date.now,
     required: true
  },
  nominationEndDate: {
    type: Date,
   default:Date.now,
    required: true
  }
});

// Create the "ApprovalDate" model based on the schema
const NominationDate = mongoose.model('NominationDate', nominationDateSchema);

module.exports = NominationDate;