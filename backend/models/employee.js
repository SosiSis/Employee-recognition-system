const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

// Define the schema for the "employee" collection
const employeeSchema = new mongoose.Schema({
 
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default:"http://localhost:3010/public/defaultProfilePicture.jpg"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

employeeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, position: this.position,department:this.department},
    "ashewa"
  );
  return token;
};

// Create the "Employee" model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;