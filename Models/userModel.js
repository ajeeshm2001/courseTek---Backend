const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is Required"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    course:{
        type:String,
        required:[true,"Course is Required"]
    },
    status:{
        type:Boolean,
        default:false
    },
})

userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.statics.login = async function(email,password){
    if(email==="" && password===""){
        throw Error("Email and Password Required")
    }else{
        const user = await this.findOne({email:email})
        if(user){
            if(user.status){
                const auth = await bcrypt.compare(password,user.password)
                if(auth){
                    return user;
                }
                else{
                    throw Error("Invalid Credentials")
                }
            }else{
                throw Error("Admin Need to Approve")
            }
            
        }else{
            throw Error("User Not Found")
        }
    }
}

module.exports = mongoose.model("Users",userSchema)