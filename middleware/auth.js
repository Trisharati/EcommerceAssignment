const jwt = require('jsonwebtoken')

const userAuth = async(req,res,next)=>{

    let token = req.headers.token || req.body.token || req.query.token
    if(token){
        jwt.verify(token,'Triveous',(err,data)=>{
            if(err){
                res.status(400).json({
                    message:'User Authorization Failed',
                    ERROR:err
                })
            }
            else{
                next()
            }
        })
    }
    else{
        res.status(400).json({
            message:'Token Not Found'
        })
    }
}
module.exports = {userAuth}