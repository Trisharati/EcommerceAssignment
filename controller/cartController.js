const { default: mongoose } = require('mongoose')
const productModel = require('../model/ProductModel')
const cartModel = require('../model/cartModel')
const userModel = require('../model/userModel')

// Add a particular product to the cart

const addtocart = async(req,res)=>{

    let isProductExist = await productModel.findOne({_id:req.body.productId})
   
        const cartObj = {
            ...req.body,
            totalprice:req.body.qty * isProductExist.price,
            createdOn:new Date()
        }
        let isUserExist = await userModel.findOne({_id:req.body.userId})
        if(isUserExist){
            cartModel(cartObj)
            .save()
            .then(()=>{
                res.status(200).json({
                    message:'Product Added to Cart Successfully'
                })
            }).catch((err)=>{
                res.status(400).json({
                    message:'Error in Adding the Product to Cart',
                    ERROR:err
                })
            })
        }
        else{
            res.status(400).json({
                message:'UserId Not Valid'
            })
        }
}

// To display the cart details which are not already ordered

const viewcart = async(req,res)=>{
    cartModel.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.body.userId)
            }
        },
        {
            $match:{
                isDeleted:false
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
                as:'Product'
            }
        },
        {
            $project:{
                _id:0,
                productId:0,
                userId:0,
                createdOn:0,
                updatedOn:0,
                __v:0
            }
        }
    ]).then((data)=>{
        res.status(200).json({
            message:'Here is the Details of Your Cart',
            CartDetails:data
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Unable to Display Cart Details',
            ERROR:err
        })
    })
}

// Function to update the quantity of a particular product and the corresponding total price

const updatecart = async(req,res)=>{

    let isProductExist = await productModel.findOne({_id:req.params.productId})

    cartModel.findOneAndUpdate({productId:req.params.productId,
                                userId:req.body.userId},
        {
          qty:req.body.qty,
          totalprice:req.body.qty * isProductExist.price,
          updatedOn:new Date()
    },{
        new:true
    }).then(()=>{
        res.status(200).json({
            message:'Cart Updated Successfully'
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Error in Updating the Cart',
            ERROR:err
        })
    })

}

// Function to remove a particular product from cart

const removeitem = async(req,res)=>{

    cartModel.findOneAndDelete({productId:req.params.productId,
                                userId:req.body.userId})
        .then(()=>{
        res.status(200).json({
            message:'Item Removed From Cart Successfully'
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Error in Updating the Cart',
            ERROR:err
        })
    })

}

module.exports = {addtocart,viewcart,updatecart,removeitem}