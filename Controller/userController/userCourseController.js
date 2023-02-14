const { default: mongoose } = require("mongoose")
const scheduleModel = require("../../Models/scheduleModel")

module.exports.courseAvailability = (async(req,res)=>{
    try{
        const {date,courseid} = req.body
        const course = await scheduleModel.find({courseId:courseid,date:date})
        res.status(302).json({course,status:true})
    }
    catch(err){
        res.status(404).json({err:err.message,status:false})
    }
})

module.exports.courseBooking = (async(req,res)=>{
    try{
        console.log("jj");
        let obj = {id:mongoose.Types.ObjectId(req.params.userid)}
        const coursebooking = await scheduleModel.findByIdAndUpdate({_id:req.params.id},{$inc:{slot:-1},$push:{users:obj}})
        console.log(coursebooking);
        res.status(200).json({status:true})
    }
    catch(err){
        console.log(err);
        res.json({err:err.message,status:false})
    }
})