const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const bcrypt = require('bcrypt')
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')



router.get('/allpost', requireLogin, (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.json({ posts })
    }).catch(err => {
      console.log(err)
    })

})

router.post('/createpost', requireLogin, (req, res) => {
  const { title, body, pic } = req.body
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please add all the fields" })
  }
  Post.create({ title, body, photo: pic, postedbyID: req.user.dataValues.id, postedbyName: req.user.dataValues.full_name }).then(post => {
    res.status(422).json({ status: post.title + " Created" });
  });
  console.log(req.user.dataValues.id);
  console.log(req.user.dataValues.full_name);
})

router.get('/mypost', requireLogin, (req, res) => {
  Post.findAll({
    where: {
      postedbyID: req.user.dataValues.id
    }
  })

    .then(post => {
      res.status(422).json({ Myposts: post })
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete('/deletepost/:id', requireLogin, (req, res) => {
  console.log(req.params);
  const postid = req.params.id;
  Post.findOne({
    where: {
      id: postid,
      postedbyID: req.user.dataValues.id
    }
  })
    .then((post, err) => {
      
      if (err || !post) {
        res.status(422).json({ error: err})
      }
      if (post.dataValues.postedbyID == req.user.dataValues.id) {
        console.log(post.dataValues.id);        
        Post.destroy({
          where: {
            id: postid,
            postedbyID: req.user.dataValues.id
          }
        })
          .then(result => {
            res.json(result)
          }).catch(err => {
            console.log(err)
          })
      }
    })
})

router.post('/comment/:id',requireLogin,async(req,res)=>{
  const postId = req.params.id;
  const {comment} = req.body
 
  if(!comment ){
    return  res.status(422).json({error:"Please add the comment"})
  }
  Comment.create({post_id:postId,user_id:req.user.dataValues.id,user_name:req.user.dataValues.full_name,comment})
  .then(comment_by=>{
    res.json({message: "commented by "+comment_by.user_name})
  })
  .catch((err)=>{
    console.log(err)
  })
  
})

router.get('/getallcomment',(req,res)=>{
  Comment.findAll({
    attributes: ['post_id', 'user_id','comment','user_name']
  })
  .then(allcomment=>{
    res.json({allcomment})
  })
  .catch((err)=>{
    console.log(err)
  })
})


module.exports = router