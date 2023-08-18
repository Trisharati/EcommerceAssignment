const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    cartId:
        [mongoose.Schema.Types.ObjectId],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    payableamount:{
        type:Number,
        required:true
    },
    createdOn:{
        type:Date,
        required:true
    }
})
module.exports = new mongoose.model('order',orderSchema)