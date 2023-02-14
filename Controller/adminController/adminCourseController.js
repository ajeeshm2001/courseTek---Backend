const courseModels = require("../../Models/courseModels");
const scheduleModel = require("../../Models/scheduleModel");
const mongoose = require('mongoose')

module.exports.addCourse = (async(req,res)=>{
    try{
        const {coursename,description,duration,subject1,subject2,subject3} = req.body;
        let obj = {subject1,subject2,subject3}
        const course = await courseModels.create({coursename,description,duration})
        const subjects = await courseModels.findByIdAndUpdate({_id:course._id},{$set:{"subjects":obj}})
        res.status(201).json({course:course._id,created:true})
    }
    catch(err){
        res.json({error:err.message,created:false})
    }
})

module.exports.getCourse = (async(req,res)=>{
    try{
        const course = await courseModels.find({})
        res.json({course:course,status:true})
    }
    catch(err){
        res.json({status:false})
    }
})

module.exports.getOneCourse = (async(req,res)=>{
    try{
        const course = await courseModels.findOne({_id:req.params.id})
        res.json({course,status:true})
    }
    catch(err){
        res.status(404).json({status:false})
    }
})

module.exports.editCourse = (async(req,res)=>{
    try{
        const {coursename,description,duration,subject1,subject2,subject3} = req.body;
        let obj = {subject1,subject2,subject3}
        const course = await courseModels.findByIdAndUpdate({_id:req.params.id},{$set:{coursename:coursename,description:description,duration:duration,"subjects":obj}})
        res.json({status:true})
    
    }
    catch(err){
        res.json({err:err.message,status:false})
    }
})

module.exports.deleteCourse = (async(req,res)=>{
    try{
        const course = await courseModels.deleteOne({_id:req.params.id})
        res.json({status:true})
    }
    catch(err){
        res.json({error:err.message,status:false})
    }
})

module.exports.courseSchedule = (async(req,res)=>{
    try{
        const {subject,date,slot}=req.body;
        const schedule = await scheduleModel.create({courseId:req.params.id,subject,date,slot})
        // const course = await courseModels.findByIdAndUpdate({_id:req.params.id},{$push:{scheduldeddates:obj}})
        res.json({schedule,status:true})
    }
    catch(err){
        console.log(err);
        res.json({err,status:false})
    }
})