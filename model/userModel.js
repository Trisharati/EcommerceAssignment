const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date
    }
})
module.exports = new mongoose.model('user',userSchema)