const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const RecognitionType = require('../models/recognition_type');
const NominationDate = require('../models/nomination_date');
const Agenda = require('agenda');

// Connect to MongoDB
const mongoConnectionString = 'mongodb://0.0.0.0:27017/EmployeeRecognitionSystem';
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'agendaJobs' } });

// Define the MongoDB collection for agenda jobs
agenda.define('activateRecognitionType', async (job) => {
  const recognitionTypeId = job.attrs.data.recognitionTypeId;
  await RecognitionType.findByIdAndUpdate(recognitionTypeId, { $set: { active_for_nomination: true } });
  console.log(`Recognition type ${recognitionTypeId} set to active.`);
});

agenda.define('deactivateRecognitionType', async (job) => {
  const recognitionTypeId = job.attrs.data.recognitionTypeId;
  await RecognitionType.findByIdAndUpdate(recognitionTypeId, { $set: { active_for_nomination: false } });
  console.log(`Recognition type ${recognitionTypeId} set to inactive.`);
});

router.post('/setdate', auth, admin, async (req, res) => {
  const { recognition_type, nominationStartDate, nominationEndDate } = req.body;
  const recognitiontype = await RecognitionType.findOne({ recognitionType: recognition_type });
   const currentDate = new Date().toISOString();
    console.log(currentDate);
  if (recognitiontype) {
    const recognitionTypeId = recognitiontype._id;

    // Check if the date for the recognition type already exists
    const existingDates = await NominationDate.findOne({ recognitionType: recognitionTypeId });
    if (existingDates) {
      return res.status(400).json({ error: 'Nomination date already set for this recognition type.' });
    }

    let dates = new NominationDate({
      recognitionType: recognitionTypeId,
      nominationStartDate,
      nominationEndDate
    });

    dates = await dates.save();

   

    // Start the agenda process and save the jobs
    await agenda.start();

    // Schedule a job to set active_for_nomination to true on the nomination start date
    const startDate = new Date(nominationStartDate);
    const endDate = new Date(nominationEndDate);
    console.log(`Scheduling activation for: ${startDate.toISOString()}`);
    console.log(`Scheduling deactivation for: ${endDate.toISOString()}`);

    agenda.schedule(startDate, 'activateRecognitionType', { recognitionTypeId });

    // Schedule a job to set active_for_nomination to false when the end date is reached
    agenda.schedule(endDate, 'deactivateRecognitionType', { recognitionTypeId });

    res.status(200).send({
      recognitionType: recognitiontype,
      nominationStartDate,
      nominationEndDate,
    });
  } else {
    res.status(404).json({ error: 'RecognitionType not found' });
  }
});

module.exports = router;