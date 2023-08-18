const mongoose = require('mongoose')
const cartModel = require('../model/cartModel')
const orderModel = require('../model/orderModel')

// Function to place order from cart

const placeorder = async(req,res)=>{

    let cartitems = await cartModel.find({userId:req.body.userId})

    let amount=0
    cartitems.map((data)=>{
        amount = data.totalprice + amount
    })

     const orderObj={
        ...req.body,
        payableamount:amount,
        createdOn:new Date()
    }
        // Placing the order and soft delete from cart
        try{
            await  orderModel(orderObj).save()
            await cartitems.map(async(data)=>{
                await cartModel.findOneAndUpdate({_id:data._id},
                    {isDeleted:true,
                    updatedOn:new Date()},
                    {
                        new:true
                    })
            })
        res.status(200).json({
            message:'Order Placed Successfully'
        })
        }
        catch(err){
            res.status(400).json({
                message:'Error in Placing the Order',
                ERROR:err
            })
        }
}

// To display the order list of a particular user.This will display only order 
// date and total amount paid.

const vieworderhistory = async(req,res)=>{

    orderModel.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.params.userId)
            }
        },
        {
            $addFields:{
                orderDate:'$createdOn',
                amountPaid:'$payableamount'  
            }
        },
        {
            $project:{
                _id:0,
                __v:0,
                cartId:0,
                userId:0,
                payableamount:0,
                createdOn:0  
            }
        }
    ]).then((data)=>{
        res.status(200).json({
            message:'Your Order History',
            OrderHistory:data
        })
    }).catch((err)=>{
        console.log(err)
        res.status(400).json({
            message:'Error in Displaying Your Order History',
            ERROR:err
        })
    })
}

// Function to display the details of a particular order when searched by its order ID

const vieworderbyid = async(req,res)=>{

    let orderDetails = await orderModel.findOne({_id:req.params.orderId})
    let cartPromises
     try {
         cartPromises=orderDetails.cartId.map(async(data)=>{   
            let cartInfo=await cartModel.aggregate([
                {
                    $match:{
                        _id:data
                    }
                },
                {
                    $lookup:{
                        from:'products',
                        localField:'productId',
                        foreignField:'_id',
                        pipeline:[{
                            $project:{
                                _id:0,
                                categoryId:0,
                                isAvailable:0,
                                madeIn:0,
                                manufacturerDetail:0,
                                rating:0,
                                __v:0
                            }
                        }],
                        as:'ProductDetails'
                    }
                },
                {
                    $project:{
                        _id:0,
                        userId:0,
                        productId:0,
                        createdOn:0,
                        isDeleted:0,
                        updatedOn:0,
                        __v:0
                    }
                }
            ])
            return cartInfo
        })
     } catch (error) {
        res.status(400).json({
                    message:'Error in Displaying Order Details',
                    ERROR:err
                })
     }
     let productDetails = await Promise.all(cartPromises)
     res.status(200).json({
        message:'Details of the OrderId You have Searched',
        orderDetails:productDetails
     })
}


module.exports = {placeorder,vieworderhistory,vieworderbyid}