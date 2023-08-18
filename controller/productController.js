const mongoose = require('mongoose')
const productModel = require('../model/ProductModel')
const categoryModel = require('../model/categoryModel')

// Function to add product under a particular category

const addProduct = async(req,res)=>{

    const productObj = {
        ...req.body
    }

    productModel(productObj)
    .save()
    .then(()=>{
        res.status(200).json({
            message:'Product Added Successfully'
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Error in adding the product',
            ERROR:err
        })
    })
}

// To display all of the products under the corresponding categories

const productList = async(req,res)=>{
    
        categoryModel.aggregate([     
            {
                $lookup:{
                    from:'products',
                    localField:'categoryId',
                    foreignField:'categoryId',
                    pipeline:[
                    {
                        $project:{
                            categoryId:0,
                            madeIn:0,
                            manufacturerDetail:0,
                            rating:0,
                            __v:0
                        }
                    }
                    ],
                    as:'Products'
                }
            },       
            {
                $project:{
                    _id:0,
                    __v:0
                }
            }
        ]).then((data)=>{
            res.status(200).json({
                message:'List of All Products for each Category Available',
                list:data
            })
        }).catch((err)=>{
            res.status(400).json({
                message:'Error in displaying the list of products',
                ERROR:err
            })
        })
}

// To display a particular product based on product ID

const viewsingleProduct = async(req,res)=>{
    let isProductExist = await productModel.findOne({_id:req.body.productId})
    if(isProductExist){
    productModel.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.body.productId)
            }
        },
        {
            $project:{
                _id:0,
                categoryId:0,
                __v:0
            }
        }
    ]).then((data)=>{
        res.status(200).json({
            message:'Details of the Product You Fetched',
            ProductDetails:data
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Unable to display the product you fetched',
            ERROR:err
        })
    })
}
else{
    res.status(400).json({
        message:'Product ID Not Found'
    })
}
}


module.exports = {addProduct,productList,viewsingleProduct}