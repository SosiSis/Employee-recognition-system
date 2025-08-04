const express = require("express");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../models/employee");
const router=express.Router()
const Notification = require('../models/notification');

 
router.get('/me',auth,(req,res)=>{
  const id=req.user._id
  Employee.find({_id: id}).then(
    object=>{
      console.log(object)
      res.json(object)
    }
  )
})

router.get('/teammate', auth, (req, res) => {
  const department = req.user.department;
  const position = req.user.position;
  const id = req.user._id;

  Employee.find({ department: department,position:position, _id: { $ne: id } }).then(
    employees => {
      console.log(employees);
      res.json(employees);
    }
  ).catch(err => {
    console.error('Error fetching teammates:', err);
    res.status(500).send({ error: "Internal server error" });
  });
});


router.post('/login', (req,res)=>{
  const{email,password}=req.body

  Employee.find({email:email}).then(
    (object)=>{
      console.log(object)
    
      if(object.length == 0)  {
    console.log('Invalid credinial user')
     }else{
    const isMatch = bcrypt.compare(object[0].password,password,)
    if(!isMatch){
      console.log('Invalid credinial')

    }else{
        const id=object[0]._id
      const position=object[0].position
      const department=object[0].department
      const email=object[0].email
      const token=object[0].generateAuthToken()
      res.header("authToken",token).send({token, position,id,department,email })
    }
  
    }

    }
  )

  

})

router.patch('/:id/password', auth, async (req, res) => {
  const { password: newPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log(hashedPassword);

    const update = {
      password: hashedPassword,
    };

    const result = await Employee.updateOne({ _id: req.params.id }, { $set: update });
    console.log(result);

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }

    res.json({ message: 'Password updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});


router.patch('/:id',auth,upload.single('profilePicture'),async (req,res)=>{
  const { firstName, lastName } = req.body;
  let profilePicture;
  if (req.file && req.file.path) {
    // Cloudinary multer-storage-cloudinary puts the url in req.file.path
    profilePicture = req.file.path;
  }
  const update = {
    firstName: firstName,
    lastName: lastName,
    ...(profilePicture && { profilePicture })
  };
  Employee.updateOne({ _id: req.params.id }, { $set: update })
    .then((object) => {
      console.log(object);
      res.json(object);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update employee profile' });
    });
});

router.get('/admin/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  

  module.exports=router