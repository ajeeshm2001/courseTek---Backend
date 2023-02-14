const userModel = require("../../Models/userModel")
const nodemailer = require('nodemailer')


module.exports.adminApprovalList = (async(req,res)=>{
    try{
        const users = await userModel.find({status:false})
        res.json({users:users})
    }
    catch(err){
        res.json(err)
    }
})

module.exports.userApproval = (async(req,res)=>{
    try{
        const user = await userModel.findById({_id:req.params.id})
        let config = {
            service : "gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        }
        let transporter = nodemailer.createTransport(config);

        let info = await transporter.sendMail({
            from: `${process.env.EMAIL}`, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Welcome to CourseTek", // plain text body
            html: `<b>Hi ${user.name},</b> <br> <b>Welcome to CourseTek.You have Enrolled the ${user.course} <b>`, // html body
          });
          if(info.messageId){
            await userModel.findByIdAndUpdate({_id:req.params.id},{status:true})
          }
          res.json({approved:true})
    }
    catch(err){
        res.json({err,approved:false})
    }
})