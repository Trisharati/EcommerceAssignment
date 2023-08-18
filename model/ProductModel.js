const mongoose = require('mongoose')
const productSchema = mongoose.Schema({

    categoryId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number
    },
    madeIn:{
        type:String
    },
    manufacturerDetails:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        required:true
    }
})
module.exports = new mongoose.model('product',productSchema)