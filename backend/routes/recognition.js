const express = require("express");
const router = express.Router();
const RecognitionType = require("../models/recognition_type");
const Employee = require("../models/employee");
const Recognition = require("../models/recognition");
const auth = require("../middlewares/auth");
const ApprovalDate = require("../models/approval_date");

router.post('/', auth, async (req, res) => {
    const { nominator_email, nominee_email, recognition_type, reason } = req.body;
    try {
        const recognitionType = await RecognitionType.findOne({ recognitionType: recognition_type });
        const nominator = await Employee.findOne({ email: nominator_email });
        const nominee = await Employee.findOne({ email: nominee_email });

        if (recognitionType && nominator && nominee) {
            const nomineeID = nominee._id;
            const nominatorID = nominator._id;
            const recognitionTypeID = recognitionType._id;

            const settedDate = await ApprovalDate.findOne({ recognitionType: recognitionTypeID });
            const currentDate = new Date();

            if (settedDate && (currentDate > settedDate.approvalStartDate && currentDate < settedDate.approvalEndDate)) {
                const exist = await Recognition.findOne({
                    recognitionTypeID: recognitionTypeID,
                    nominatorID: nominatorID,
                    nomineeID: nomineeID,
                });

                if (!exist) {
                    let recognition = new Recognition({
                        recognitionTypeID: recognitionTypeID,
                        nomineeID: nomineeID,
                        nominatorID: nominatorID,
                        reason: reason
                    });

                    recognition = await recognition.save();
                    res.status(200).send({ message: "Recognition created successfully", recognition });
                } else {
                    console.log('Already recognized');
                    res.status(200).send('Already recognized');
                }
            } else {
                res.status(400).send({ error: "Invalid approval date" });
            }
        } else {
            res.status(400).send({ error: "Invalid input data" });
        }
    } catch (error) {
        console.error('Error creating recognition:', error);
        res.status(500).send({ error: "Internal server error" });
    }
});

module.exports = router;
