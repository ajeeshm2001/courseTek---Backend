const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const env = require('dotenv').config()
const cookieparser = require('cookie-parser')
const adminRouter = require('./Routes/adminRouter')
const userRouter = require('./Routes/userRouter')
const cors = require('cors')
const app = express();


app.listen(4000,()=>{
    console.log(`Server Connected to ${process.env.PORT}`);
})

mongoose.connect("mongodb://0.0.0.0:27017/courseTek").then(()=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.log(err);
})

app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET,POST,PUT,PATCH,DELETE"],
    credentials:true
}))
app.use(express.json())
app.use(cookieparser())
app.use('/admin',adminRouter)
app.use('/',userRouter)
