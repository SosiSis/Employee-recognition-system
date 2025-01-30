const express = require("express");
const router=express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const RecognitionType = require("../models/recognition_type");
router.get('/active',auth,async(req,res)=>{
    const user_position= req.user.position;
    console.log(user_position)
    const types=await RecognitionType.find({active_for_nomination:true})
    console.log(types)
    res.status(200).send({ types });

})
router.get('/',auth,admin,async(req,res)=>{
  
    const types=await RecognitionType.find()
    console.log(types)
    res.status(200).send({ types });

})


router.patch('/',auth,admin,async(req,res)=>{
    const type =req.query.recognition_type
    const recognition_type= await RecognitionType.updateOne({_id:type},{$set:{active:false}})
    res.status(200).send({ recognition_type });

})
router.delete('/',auth,admin,async(req,res)=>{
    const type =req.query.recognition_type
    const recognition_type= await RecognitionType.deleteOne({_id:type})
    res.status(200).send('Deleted successfully')
})
router.post('/', auth, admin, async (req, res) => {
    const { recognitionType, eligiblePosition, description } = req.body;

    // Check if the recognitionType already exists
    const existingRecognitionType = await RecognitionType.findOne({ recognitionType });
    if (existingRecognitionType) {
        return res.status(400).send({ error: 'Recognition type already exists' });
    }

    let recognition_type = new RecognitionType({
        recognitionType,
        eligiblePosition,
        description
    });

    recognition_type = await recognition_type.save();
    res.status(200).send({ recognitionType, eligiblePosition, description });
});


module.exports=router