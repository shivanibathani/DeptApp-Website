  
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const User = require('../models/user')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }
        console.log(payload);
        const {id} = payload
        User.findByPk(id).then(userdata=>{
            //console.log(userdata);
            req.user = userdata
            
        next()
        })
        
    })
}
