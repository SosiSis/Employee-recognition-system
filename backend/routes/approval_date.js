const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const RecognitionType = require('../models/recognition_type');
const ApprovalDate = require('../models/approval_date');
const axios = require('axios');
const Agenda = require('agenda');

// Connect to MongoDB
const mongoConnectionString = 'mongodb://0.0.0.0:27017/EmployeeRecognitionSystem';
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'agendaJobs' } });

// Define the MongoDB collection for agenda jobs
agenda.define('activateRecognitionType', async (job) => {
  const recognitionTypeId = job.attrs.data.recognitionTypeId;
  await RecognitionType.findByIdAndUpdate(recognitionTypeId, { $set: { active_for_approvement: true } });
  console.log(`Recognition type ${recognitionTypeId} set to active.`);
});

agenda.define('deactivateRecognitionType', async (job) => {
  const recognitionTypeId = job.attrs.data.recognitionTypeId;
  await RecognitionType.findByIdAndUpdate(recognitionTypeId, { $set: { active_for_approvement: false } });
  console.log(`Recognition type ${recognitionTypeId} set to inactive.`);

  // Send POST request to /report
  try {
    const response = await axios.post('http://localhost:3000/report', {
      recognition_type: recognitionTypeId // Ensure this field matches what your report endpoint expects
    });
    console.log('Report generated successfully:', response.data);
  } catch (error) {
    console.error('Error generating report:', error);
  }
});

router.post('/setdate', auth, admin, async (req, res) => {
  const { recognition_type, approvalStartDate, approvalEndDate } = req.body;
  const recognitiontype = await RecognitionType.findOne({ recognitionType: recognition_type });
  const currentDate = new Date().toISOString();
  console.log(currentDate);
  if (recognitiontype) {
    const recognitionTypeId = recognitiontype._id;

    // Check if the date for the recognition type already exists
    const existingDates = await ApprovalDate.findOne({ recognitionType: recognitionTypeId });
    if (existingDates) {
      return res.status(400).json({ error: 'Approval date already set for this recognition type.' });
    }

    let dates = new ApprovalDate({
      recognitionType: recognitionTypeId,
      approvalStartDate,
      approvalEndDate
    });

    dates = await dates.save();

    // Start the agenda process and save the jobs
    await agenda.start();

    // Schedule a job to set active_for_nomination to true on the nomination start date
    const startDate = new Date(approvalStartDate);
    const endDate = new Date(approvalEndDate);
    console.log(`Scheduling activation for: ${startDate.toISOString()}`);
    console.log(`Scheduling deactivation for: ${endDate.toISOString()}`);

    agenda.schedule(startDate, 'activateRecognitionType', { recognitionTypeId });

    // Schedule a job to set active_for_nomination to false when the end date is reached
    agenda.schedule(endDate, 'deactivateRecognitionType', { recognitionTypeId });

    res.status(200).send({
      recognitionType: recognitiontype,
      approvalStartDate,
      approvalEndDate,
    });
  } else {
    res.status(404).json({ error: 'RecognitionType not found' });
  }
});

router.post('/report', auth, async (req, res) => {
  try {
    const { recognition_type } = req.body;

    // Find the recognition type ID based on the provided recognition type
    const recognitionType = await RecognitionType.findOne({ recognitionType: recognition_type });

    if (!recognitionType) {
      return res.status(400).send({ error: "Invalid recognition type" });
    }

    const recognitionTypeID = recognitionType._id;

    // Find all recognitions with the given recognition type ID and count the occurrences for each nominee
    const result = await Recognition.aggregate([
      { $match: { recognitionTypeID: recognitionTypeID } },
      {
        $group: {
          _id: "$nomineeID",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Initialize an object to store the winner with the highest count
    let winner = { count: 0, nomineeID: null };

    // Iterate over each item in the "result" array
    result.forEach(item => {
      // Check if the count is higher than the current winner's count
      if (item.count > winner.count) {
        winner = { count: item.count, nomineeID: item._id };
      }
    });

    let reportData = null;

    // Check if a winner was found
    if (winner.nomineeID) {
      // Find the reward type for the recognition type ID
      const rewardType = await Reward.findOne({ recognitionType: recognitionTypeID });

      if (rewardType) { // Check if rewardType is found
        reportData = { nomineeID: winner.nomineeID, rewardTypeID: rewardType._id };
        console.log(`Nominee ${winner.nomineeID} is the winner with a count of ${winner.count}`);
      } else {
        console.log(`No reward type found for recognition type ID: ${recognitionTypeID}`);
      }
    } else {
      console.log("No winner found");
    }

    // Create Report instance using the reportData
    if (reportData) {
      const report = new Report({
        employeeID: reportData.nomineeID, // Assuming this is the correct field for employee ID
        rewardID: reportData.rewardTypeID, // Assuming this is the correct field for reward type ID
        recognitionTypeID: recognitionTypeID
      });
      await report.save();
      res.status(200).send({ message: "Report created successfully", report });
    } else {
      res.status(400).send({ error: "No winner found or no reward type found" });
    }

  } catch (error) {
    console.error("Error processing winners:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
