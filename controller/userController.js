const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Register function for registration of the users

const register = async(req,res)=>{

    const userObj={
        ...req.body,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
        token:jwt.sign(req.body,'Triveous'),
        createdOn:new Date()
    }

  let isUserExist = await userModel.findOne({email:req.body.email})
  if(isUserExist){
    res.status(400).json({
        message:'Email Id already exists'
    })
  }
  else{
    userModel(userObj)
    .save()
    .then((data)=>{
        res.status(200).json({
            message:'User Registered Successfully'
        })
    }).catch((err)=>{
        res.status(400).json({
            message:'Error in Registration',
            ERROR:err
        })
    })
  }
}

// Function for Login of the users

const login = async(req,res)=>{

    let isUserExist = await userModel.findOne({email:req.body.email})
    if(isUserExist){
        if(bcrypt.compareSync(req.body.password,isUserExist.password)){
            res.status(200).json({
                message:`${isUserExist.name} Logged In Successfully`
            })
        }
        else{
            res.status(400).json({
                message:'Wrong Password'
            })
        }
    }
    else{
        res.status(400).json({
            message:'Email Not Found'
        })
    }
}

module.exports = {register,login}