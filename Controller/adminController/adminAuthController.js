const jwt = require('jsonwebtoken')
const adminCredentials = {
    username : process.env.ADMIN_USERNAME,
    password : process.env.ADMIN_PASSWORD
}
const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:maxAge})
}


module.exports.adminLogin=((req,res)=>{
    try{
        const {username,password} = req.body
        if(username==adminCredentials.username&&password==adminCredentials.password){
            const token = createToken(username)
            res.cookie("adminjwt",token)
            res.json({status:true})
        }else{
            throw Error ("Invalid Credentials")
        }

    }catch(err){
        res.json({err,status:false})
    }
})