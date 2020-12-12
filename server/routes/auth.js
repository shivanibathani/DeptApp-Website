const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, EMAIL, PASS } = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  
  service: "gmail",

  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

// router.get('/protected', requireLogin, (req, res) => {
//   res.send("hello user")
// })

router.post('/signup', (req, res) => {
  const today = new Date()
  const userData = {
    full_name: req.body.full_name,
    
    email: req.body.email,
    password: req.body.password,
    pic: req.body.pic,
    utype: req.body.utype,
    createdAt: today
  }
  const { full_name, email, password,utype} = req.body
  if (!email || !password || !full_name || !utype) {
    return res.status(422).json({ error: "please add all the fields" })
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          //const result;
          User.create(userData)
            .then(user => {
              //result = user;
             
             
              // res.status(422).json({ status: user.email + ' Registered!' })
              const token = jwt.sign(user.dataValues, JWT_SECRET)
              const url = "/verify/" + token;
              let mailOptions = {
                from: '"CAMPUSTALK" <conquer.with.campus.talk@gmail.com>',
                to: user.email,
                subject: "Email Confirmation",
                html:
                  "<h1>Greetings from Campus Talk!</h1> <br/> Click on the link to verify your email: <br/><h3>You will be redirected to our SignIn page :)</h3><br/> <a href=http://localhost:5000" +
                  url +
                  ">Click Here</a>",
              };
              transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  // console.log("Email Sent");
                  res.json({
                    message: "Register Successfully",
                    token,
                    data
                  });
                }
              });
            })
            .catch(err => {
              res.send('error: ' + err)
            })

          // User.create(userData)
          //   .then(user => {
          //     res.status(422).json({ status: user.email + ' Registered!' })
          //   })
          //   .catch(err => {
          //     res.send('error: ' + err)
          //   })
        })

      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


router.post('/signin', (req, res) => {

  const { email, password, full_name } = req.body
  if (!email || !password || !full_name) {
    return res.status(422).json({ error: "please add email or password" })
  }

  User.findOne({
    where: {
      email: req.body.email,
      full_name: req.body.full_name
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {

          const token = jwt.sign(user.dataValues, JWT_SECRET)
          const { id, name, email, full_name, pic ,utype} = user
          res.json({ token, user: { id, name, email, full_name, pic,utype} })
          // res.json({token})
          //let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          // expiresIn: 1440
          // })
          res.send(token)
          res.json({ message: "Signin Successful" })
        }
      } else {
        res.status(422).json({ error: 'Invalid email or password' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err + ".......................error........" })
    })
})

router.get('/verify/:token', (req, res) => {

  try {
    // console.log("Successfully registered User");
    // console.log(req.params);
    const user = jwt.verify(req.params.token, JWT_SECRET);
    console.log(user);
    // console.log("Successfully registered User" + user._id);

      User.findOne({
      where: {
        id:user.id
      }
    }).then((founduser) => {

      res.redirect("http://localhost:3000");
    });
  } catch (e) {
    console.log(e);
  }

})

router.post('/updatepic',requireLogin,(req,res)=>{

  const user=req.user.dataValues.id;
  User.findOne({where:{
    id:user
  }}).then(result=>{
    result.pic=req.body.pic;
    result.save();
    res.json(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})
module.exports = router