const userModel = require("../../Models/userModel");
const jwt = require('jsonwebtoken')
const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:maxAge})
}

module.exports.userRegistration = (async(req,res)=>{
    try{
        const {name,email,password,course}=req.body;
        const user = await userModel.create({name:name,email:email,password:password,course:course})
        res.status(201).json({user:user.email,created:true})
    }
    catch(err){
        res.json({err,created:false})
    }
})

module.exports.userLogin = (async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await userModel.login(email,password)
        const token = createToken(email)
        res.cookie("userjwt",token)
        res.status(201).json({user:user.name,status:true})
    }
    catch(err){
        res.json({err:err.message,status:false})
    }
})