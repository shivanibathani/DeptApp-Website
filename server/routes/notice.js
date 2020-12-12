const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const bcrypt = require('bcrypt')
const Notice = require('../models/notice')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/allnotice', requireLogin, (req, res) => {
  Notice.findAll()
    .then((notices) => {
      res.json({ notices })
    }).catch(err => {
      console.log(err)
    })

})

router.post('/createnotice', requireLogin, (req, res) => {
  const { pic } = req.body
  if(req.user.dataValues.utype=="faculty"){
  if (!pic) {
    return res.status(422).json({ error: "Please add notice" })
  }
  Notice.create({author_id:req.user.dataValues.id,notice_url:pic,author_name: req.user.dataValues.full_name }).then(notice => {
    res.status(422).json({ status:"Notice Created" });
  });
 // console.log(req.user.dataValues.id);
  //console.log(req.user.dataValues.first_name);
}
else{
  return res.status(422).json({ error: "Student cannot create notice" })
}
})


router.delete('/deletenotice/:id', requireLogin, (req, res) => {
 // console.log(req.params);
  const noticeid = req.params.id;
  Notice.findOne({
    where: {
      id: noticeid,
      author_id: req.user.dataValues.id
    }
  })
    .then((notice, err) => {
      if (err || !notice) {
        res.status(422).json({ error: err})
      }
      if (notice.dataValues.author_id == req.user.dataValues.id) {
        //console.log(post.dataValues.id);        
        Notice.destroy({
          where: {
            id: noticeid,
            author_id: req.user.dataValues.id
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


  


module.exports = router