const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Courseid is Required"]
    },
    subject:{
        type:String,
        required:[true,"Subject is Required"]
    },
    date:{
        type:String,
        required:[true,"Date is Required"]
    },
    slot:{
        type:Number,
        required:[true,"Slot is Required"]
    },
    users:[]
})

module.exports = mongoose.model("schedulecourse",scheduleSchema)