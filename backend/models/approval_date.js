const mongoose = require('mongoose');

// Define the schema for the "approvalDate" collection
const approvalDateSchema = new mongoose.Schema({
 
  recognitionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecognitionType',
    required: true
  },
  approvalStartDate: {
 
    type: Date,
    required: true
  },
  approvalEndDate: {
   
    type: Date,
    required: true
  }
});

// Create the "ApprovalDate" model based on the schema
const ApprovalDate = mongoose.model('ApprovalDate', approvalDateSchema);

module.exports = ApprovalDate;