const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const bcrypt = require('bcrypt')
const Post = require('../models/post')
const User = require('../models/user')
const Like = require('../models/like')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')
//const { where } = require('sequelize/types')


router.post('/likepost/:id',requireLogin,(req,res)=>{
    const postId = req.params.id;
    
    Like.create({post_id:postId,user_id:req.user.dataValues.id,userf_name:req.user.dataValues.full_name})
    .then(like=>{
      res.status(422).json({status: "liked by "+like.userf_name})
    
      
    })
    .catch((err)=>{
      console.log(err)
    })

    Like.count({
        where:{post_id:postId}
    }).then(like_count=>{
        like_count=parseInt(like_count)
        res.status(422).json({status:like_count+1,pid:postId})
         // console.log(typeof like_count)
    })
    .catch((err)=>{
  
        console.log(err)
    })

  })


  router.post('/dislikepost/:id',requireLogin,async(req,res)=>{
    const postId = req.params.id;
    await Like.findAll({where : {
      post_id:postId,
      user_id:req.user.dataValues.id
    }})
    .then(like=>{
      Like.destroy({where:{
        post_id:postId,
        user_id:req.user.dataValues.id
      }});
      res.status(422).json({status: "disliked by " + req.user.dataValues.full_name})
    })
    .catch((err)=>{
      console.log(err)
    })
  })

//   Like.count({
//       where:{post_id:postId}
//   }).then(like_count=>{
//       res.status(422).json({status:"total likes:"+like_count})
//   })
//   .catch((err)=>{

//       console.log(err)
//   })

  module.exports = router