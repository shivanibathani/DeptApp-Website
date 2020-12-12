const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const bcrypt = require('bcrypt')
const Event = require('../models/event')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/allevent', requireLogin, (req, res) => {
  Event.findAll()
    .then((events) => {
      res.json({ events })
    }).catch(err => {
      console.log(err)
    })

})

router.post('/createevent', requireLogin, (req, res) => {
  const { name, des, venue,date,pic,registration_link } = req.body
  if (!name || !des || !registration_link || !venue || !date || !pic) {
    return res.status(422).json({ error: "Please add all the fields" })
  }
  Event.create({name,des,date,author_id:req.user.dataValues.id,poster_url:pic,venue,registration_link,author_name: req.user.dataValues.full_name }).then(event => {
    res.status(422).json({ status: event.name + " Created" });
  });
 // console.log(req.user.dataValues.id);
  //console.log(req.user.dataValues.first_name);
})


router.delete('/deleteevent/:id', requireLogin, (req, res) => {
 // console.log(req.params);
  const eventid = req.params.id;
  Event.findOne({
    where: {
      id: eventid,
      author_id: req.user.dataValues.id
    }
  })
    .then((event, err) => {
      if (err || !event) {
        res.status(422).json({ error: err})
      }
      if (event.dataValues.author_id == req.user.dataValues.id) {
        //console.log(post.dataValues.id);        
        Event.destroy({
          where: {
            id: eventid,
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