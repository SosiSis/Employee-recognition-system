const mongoose=require('mongoose');

const notificationSchema =new mongoose.Schema(
    {
        // employeeID: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Employee',
        //     required: true
        //   },
        
          message:{
            type:String,
            required:true,
          },
          date: {
            type: Date,
            required: true
          },
          status: {
            type: Boolean,
            default: false,
          },

    }
);

const Notification=mongoose.model('Notification',notificationSchema);
module.exports=Notification;