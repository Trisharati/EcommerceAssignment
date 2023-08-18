const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    },
    createdOn:{
        type:Date,
        required:true
    },
    updatedOn:{
        type:Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
module.exports = new mongoose.model('cart',cartSchema)
