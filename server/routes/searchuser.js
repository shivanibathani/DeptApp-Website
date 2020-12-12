const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const { Op } = require("sequelize");
const User = require('../models/user')
const ChatRoom = require('../models/chatroom')
const Message = require('../models/messages')
const requireLogin = require('../middleware/requireLogin');
const user = require('../models/user');

router.post('/searchUser',requireLogin,(req,res)=>{
    const {value} = req.body    
    User.findAll({where:{
        [Op.or]:[
            {
                full_name:{[Op.like]:value}
            }
            
        ]
    }})
    .then(result=>{
        res.json({result})
    })
    .catch(err=>{
        console.log(err)
    })

})

router.get('/getUser/:id',(req,res)=>{
    uId = req.params.receiver_id;
    User.findOne({where:{
        id : uId
    }})
    .then(result=>{
        res.json({result})
    })
})
module.exports=router