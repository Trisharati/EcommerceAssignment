const mongoose=require('mongoose')
const express=require('express')
const rateLimit = require('express-rate-limit')
const app=express()
require('dotenv').config()

app.use(express.json())

const limiter = rateLimit({
    windowMs: 30*60*1000,
    max:30,
    message:'You have exceeded maximum API fetch limit'
})
app.use(limiter)
const router=require('./router')
app.use('/',router)

const port = process.env.PORT || 1500
mongoose.connect(process.env.mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(port,()=>{
        console.log('DB is connected')
        console.log(`http://localhost:${port}`)
    })
}).catch((err)=>{
    console.log('Error in connecting DB',err)
})