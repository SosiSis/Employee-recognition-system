const mongoose = require('mongoose');

// Define the schema for the "report" collection
const reportSchema = new mongoose.Schema({
  
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  recognitionTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecognitionType',
    required: true
  },
  rewardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  analyticsData: {
    type: Object // Modify the type based on the structure of your analytics data
  }
});

// Create the "Report" model based on the schema
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;