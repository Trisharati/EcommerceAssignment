const categoryModel = require('../model/categoryModel')

// To create category list

const addCategory = async(req,res)=>{

    categoryModel({...req.body})
    .save()
    .then(()=>{
        res.status(200).json({
            message:'Category Added Successfully'
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Error in creating category',
            ERROR:err
        })
    })
}

// Function to display all categories

const viewCategory = async(req,res)=>{

    categoryModel
    .aggregate([
        {
            $project:{
                _id:0,
                __v:0
            }
        }
    ]).then((data)=>{
        res.status(200).json({
            message:'List of Categories',
            Categories:data
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Error in displaying List of Categories',
            ERROR:err
        })
    })
    
}

module.exports = {addCategory,viewCategory}