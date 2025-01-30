const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employee =require('./routes/employee')
const nomination_date =require('./routes/nomination_date')
const approval_date =require('./routes/approval_date')
const nomination =require('./routes/nomination')
const notification =require('./routes/notification')
const recognition_type =require('./routes/recognition_type')
const recognition =require('./routes/recognition')
const report =require('./routes/report')
const  reward =require('./routes/reward')
const reward_type =require('./routes/reward_type')
const support =require('./routes/support')

const path = require("path");
const app = express();



const mongoURL =
"mongodb://0.0.0.0:27017/EmployeeRecognitionSystem";


mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("The server is connected to database...");
  })
  .catch((e) => {
    console.log("something is wrong", e);
  });

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/api/employee", employee);
app.use("/api/nomination_date", nomination_date);
app.use("/api/approval_date", approval_date);
app.use("/api/nomination", nomination);
app.use("/api/notification", notification);
app.use("/api/recognition_type", recognition_type);
app.use("/api/recognition",recognition);
app.use("/api/report",report);
app.use("/api/reward", reward);
app.use("/api/reward_type", reward_type);
app.use("/api/support", support);

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`The server is running on port number ${PORT}`);
});

