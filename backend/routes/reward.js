const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const RecognitionType = require("../models/recognition_type");
const RewardType = require("../models/reward_type");
const Reward = require("../models/reward");

router.post('/', auth, admin, async (req, res) => {
  const { recognition_type, reward_type, amount } = req.body;

  const recognitiontype = await RecognitionType.find({ recognitionType: recognition_type });
  const rewardtype = await RewardType.find({ rewardType: reward_type });

  if (recognitiontype.length > 0 && rewardtype.length > 0) {
    const recognitionType = recognitiontype[0]._id;
    const rewardType = rewardtype[0]._id;

    const existingReward = await Reward.find({ recognitionType });

    if (existingReward.length === 0) {
      let reward = new Reward({
        recognitionType,
        rewardType,
        amount
      });

      reward = await reward.save();
      res.status(200).send({ recognitionType, rewardType, amount });
    } else {
      res.send("Reward for this type of recognition type already exists.");
    }
  } else {
    res.status(404).send("Recognition type or reward type not found.");
  }
});

module.exports = router;