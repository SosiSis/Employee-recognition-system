const express = require("express");
const router=express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const RewardType = require("../models/reward_type");


router.post('/', auth, admin, async (req, res) => {
    const { rewardType, description } = req.body;

    // Check if the rewardType already exists
    const existingRewardType = await RewardType.findOne({ rewardType });
    if (existingRewardType) {
        return res.status(400).send({ error: 'Reward type already exists' });
    }

    let reward_type = new RewardType({
        rewardType,
        description
    });

    reward_type = await reward_type.save();
    res.status(200).send({ rewardType, description });
});

router.get('/',auth,async(req,res)=>{
  
    const types=await RewardType.find()
    console.log(types)
    res.status(200).send({ types });

})

module.exports=router