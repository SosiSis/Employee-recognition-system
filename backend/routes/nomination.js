const express = require("express");
const router = express.Router();
const RecognitionType = require("../models/recognition_type");
const Employee = require("../models/employee");
const Nomination = require("../models/nomination");
const auth = require("../middlewares/auth");
const NominationDate = require("../models/nomination_date");

router.post('/', auth, async (req, res) => {
    const { nominator_email, nominee_email, recognition_type, reason } = req.body;
    try {
        const recognitiontype = await RecognitionType.findOne({ recognitionType: recognition_type });
        const nominator = await Employee.findOne({ email: nominator_email });
        const nominee = await Employee.findOne({ email: nominee_email });

        if (recognitiontype && nominator && nominee) {
            const nomineeID = nominee._id;
            const nominatorID = nominator._id;
            const recognitionTypeID = recognitiontype._id;

            const settedDate = await NominationDate.findOne({ recognitionType: recognitionTypeID });
            const currentDate = new Date();
            console.log(settedDate)
            console.log(currentDate)
            if (settedDate && (currentDate > settedDate.nominationStartDate && currentDate < settedDate.nominationEndDate)) {
                const exist = await Nomination.findOne({
                    recognitionTypeID: recognitionTypeID,
                    nominatorID: nominatorID,
                    nomineeID: nomineeID,
                });

                if (!exist) {
                    let nomination = new Nomination({
                        recognitionTypeID: recognitionTypeID,
                        nomineeID: nomineeID,
                        nominatorID: nominatorID,
                        reason: reason
                    });

                    nomination = await nomination.save();
                    res.status(200).send({ message: "Nomination created successfully", nomination });
                } else {
                    console.log('Already nominated');
                    res.status(200).send('Already nominated');
                }
            } else {
                res.status(400).send({ error: "Invalid nomination date" });
            }
        } else {
            res.status(400).send({ error: "Invalid input data" });
        }
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});


router.get('/nomination-count', auth, async (req, res) => {
    try {
      const nominations = await Nomination.aggregate([
        {
          $lookup: {
            from: 'employees',
            localField: 'nomineeID',
            foreignField: '_id',
            as: 'nominee'
          }
        },
        {
          $unwind: '$nominee'
        },
        {
          $lookup: {
            from: 'recognitiontypes',
            localField: 'recognitionTypeID',
            foreignField: '_id',
            as: 'recognitionType'
          }
        },
        {
          $unwind: '$recognitionType'
        },
        {
          $group: {
            _id: {
              nomineeID: '$nomineeID',
              recognitionTypeID: '$recognitionTypeID'
            },
            count: { $sum: 1 },
            nominee: { $first: '$nominee' },
            recognitionType: { $first: '$recognitionType' }
          }
        },
        {
          $project: {
            _id: 0,
            nomineeID: '$_id.nomineeID',
            recognitionTypeID: '$_id.recognitionTypeID',
            count: 1,
            nominee: {
              firstName: 1,
              lastName: 1,
              department: 1,
              email:1
            },
            recognitionType: 1
          }
        }
      ]);
  
      console.log('Nominations:', nominations);
  
      // Further processing or response handling
      res.json({ nominations });
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });

  router.get('/nomination-details/:nomineeID/:recognitionTypeID', auth, async (req, res) => {
    const { nomineeID, recognitionTypeID } = req.params;
    try {
        const nominations = await Nomination.find({
            nomineeID,
            recognitionTypeID,
            
        }).populate('nominatorID', 'firstName lastName email')
          .populate('nomineeID', 'firstName lastName'); // Populate nomineeID as well

        if (!nominations || nominations.length === 0) {
            return res.status(404).send({ error: "Nominations not found" });
        }

        const recognitionType = await RecognitionType.findById(recognitionTypeID);

        const result = nominations.map(nomination => ({
            nominee: nomination.nomineeID,
            nominator: nomination.nominatorID,
            recognitionType: recognitionType ? recognitionType.recognitionType : 'Unknown',
            reason: nomination.reason,
            is_anonymous:nomination.is_anonymous
        }));

        res.json(result);
    } catch (error) {
        console.error('Error fetching nomination details:', error);
        res.status(500).send({ error: "Internal server error" });
    }
});

module.exports = router;
