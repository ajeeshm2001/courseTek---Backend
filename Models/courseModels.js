const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    coursename:{
        type:String,
        unique:true,
        required :[true,"CourseName is Required"]
    },
    description:{
        type:String,
        required : [true,"Description is Required"]
    },
    duration :{
        type:Number,
        required : [true,"Duration is Required"]
    },
    subjects : {}
})

module.exports = mongoose.model("course",courseSchema)