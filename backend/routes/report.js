const express = require("express");
const Recognition = require("../models/recognition");
const RecognitionType = require("../models/recognition_type");
const Report = require("../models/report");
const Reward = require("../models/reward");
const RewardType = require("../models/reward_type");
const Employee = require("../models/employee");
const Nomination = require("../models/nomination");

const auth = require("../middlewares/auth");
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const recognitionTypeID = req.query.recognitionType;

    // Find all reports with the given recognition type ID
    const reports = await Report.find({ recognitionTypeID });

    if (!reports || reports.length === 0) {
      return res.status(404).send({ error: "No reports found for the specified recognition type" });
    }

    // Initialize an array to store employee data with recognition, nomination, reward, and count information
    const employeesWithDetails = [];

    // Iterate over each report to gather employee, recognition, nomination, and reward information
    for (const report of reports) {
      const employeeID = report.employeeID;

      // Find employee details based on the employee ID
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        console.log(`Employee not found for ID: ${employeeID}`);
        continue; // Skip to the next report if employee not found
      }

      const { name, department } = employee;

      // Find recognition count for the employee and specific recognition type
      const recognitionCount = await Recognition.countDocuments({ nomineeID: employeeID, recognitionTypeID });

      // Find nomination count for the employee and specific recognition type
      const nominationCount = await Nomination.countDocuments({ nomineeID: employeeID, recognitionTypeID });

      // Find reward details based on the reward ID from the report
      const reward = await Reward.findById(report.rewardID);
      if (!reward) {
        console.log(`Reward not found for ID: ${report.rewardID}`);
        continue; // Skip to the next report if reward not found
      }

      const { rewardType } = reward;

      // Check if the employee already exists in the array, and update the reward and count if so
      const existingEmployee = employeesWithDetails.find(emp => emp.employeeID === employeeID);
      if (existingEmployee) {
        existingEmployee.rewardCount++;
        existingEmployee.recognitionCount += recognitionCount;
        existingEmployee.nominationCount += nominationCount;
      } else {
        // Add employee with recognition, nomination, reward, and count information to the array
        employeesWithDetails.push({
          employeeID,
          name,
          department,
          rewardType,
          rewardCount: 1, // Initialize reward count as 1 for the first occurrence
          recognitionCount,
          nominationCount
        });
      }
    }
    res.status(200).send({ employeesWithDetails });
  } catch (error) {
    console.error("Error fetching employee data with details:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});



router.get('/all', auth, async (req, res) => {
  try {
    // Fetch all reports
    const reports = await Report.find();

    if (!reports || reports.length === 0) {
      return res.status(404).send({ error: "No reports found" });
    }

    // Initialize a map to store employee data with recognition, nomination, reward, and count information
    const employeesWithDetails = new Map();

    // Cache for recognition and reward types to avoid repeated database calls
    const recognitionTypesCache = new Map();
    const rewardTypesCache = new Map();

    // Iterate over each report to gather employee, recognition, nomination, and reward information
    for (const report of reports) {
      const { employeeID, recognitionTypeID, rewardID } = report;

      // Find employee details based on the employee ID
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        console.log(`Employee not found for ID: ${employeeID}`);
        continue; // Skip to the next report if employee not found
      }

      const { firstName, lastName, department } = employee;
      const employeeName = `${firstName} ${lastName}`;

      // Find recognition count for the employee and specific recognition type
      const recognitionCount = await Recognition.countDocuments({ nomineeID: employeeID, recognitionTypeID });

      // Find nomination count for the employee and specific recognition type
      const nominationCount = await Nomination.countDocuments({ nomineeID: employeeID, recognitionTypeID });

      // Find reward details based on the reward ID from the report
      let rewardTypeName = rewardTypesCache.get(rewardID);
      if (!rewardTypeName) {
        const reward = await Reward.find({_id:rewardID});
        console.log(reward[0])
        if (!reward) {
          console.log(`Reward not found for ID: ${rewardID}`);
          continue; // Skip to the next report if reward not found
        }
        const rewardType = await RewardType.find({_id:reward[0].rewardType});
        rewardTypeName = rewardType[0] ? rewardType[0].rewardType : "Unknown Reward Type";
        console.log(rewardType)
        rewardTypesCache.set(rewardID, rewardTypeName);
      }

      // Find recognition type name
      let recognitionTypeName = recognitionTypesCache.get(recognitionTypeID);
      if (!recognitionTypeName) {
        const recognitionType = await RecognitionType.find({_id:recognitionTypeID});
        recognitionTypeName = recognitionType[0] ? recognitionType[0].recognitionType : "Unknown Recognition Type";
        recognitionTypesCache.set(recognitionTypeID, recognitionTypeName);
      }

      // Check if the employee already exists in the map, and update the reward and count if so
      if (employeesWithDetails.has(employeeName)) {
        const existingEmployee = employeesWithDetails.get(employeeName);
        existingEmployee.rewards[rewardTypeName] = (existingEmployee.rewards[rewardTypeName] || 0) + 1;
        existingEmployee.recognitions[recognitionTypeName] = (existingEmployee.recognitions[recognitionTypeName] || 0) + recognitionCount;
        existingEmployee.nominations[recognitionTypeName] = (existingEmployee.nominations[recognitionTypeName] || 0) + nominationCount;
      } else {
        // Add employee with recognition, nomination, reward, and count information to the map
        employeesWithDetails.set(employeeName, {
          name: employeeName,
          department,
          rewards: { [rewardTypeName]: 1 },
          recognitions: { [recognitionTypeName]: recognitionCount },
          nominations: { [recognitionTypeName]: nominationCount }
        });
      }
    }

    // Convert the map to an array
    const employeesWithDetailsArray = Array.from(employeesWithDetails.values());

    res.status(200).send({ employeesWithDetails: employeesWithDetailsArray });
  } catch (error) {
    console.error("Error fetching employee data with details:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const { recognition_type } = req.body;

    // Find the recognition type ID based on the provided recognition type
    const recognitionType = await RecognitionType.findOne({ recognitionType:recognition_type });

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
        rewardID: reportData.rewardTypeID ,// Assuming this is the correct field for reward type ID
        recognitionTypeID:recognitionTypeID
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
