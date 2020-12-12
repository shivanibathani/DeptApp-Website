const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const Complaint = require('../models/complaint')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.post('/makecomplaint',requireLogin,(req,res)=>{
    const {complaint} = req.body
    const today = new Date()
    const complainData = {
        complaint: complaint,
        user_id:req.user.dataValues.id,
        user_name: req.user.dataValues.full_name,
        madeAt:today
    }
    Complaint.create(complainData)
    .then(result=>{
        res.json({message:"Complaint registered by: "+result.user_name})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/reslovecomplaint/:id',requireLogin,(req,res)=>{
    const {remarks} = req.body;
    const compID = req.params.id;
    const today = new Date()
    const resolver = req.user.dataValues.id
    console.log(resolver)
    Complaint.findOne({where:{
        id:compID
    }})
    .then(result=>{
        console.log(resolver)
        result.resolver_id = resolver;
        result.resolvedAt = today;
        result.resolver_remarks = remarks;
        
        User.findOne({where:{
            id: resolver
        }}).then(Resolver=>{
            User.findOne({where:{
                id:resolver
            }})
            .then(Resolver=>{
                result.resolver_name = Resolver.full_name;
                result.save();
                res.json({message: "Resolved",result})
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getAllComplaints',requireLogin,(req,res)=>{
    Complaint.findAll({
        attributes: ['id', 'complaint','user_id','user_name','resolver_id','resolver_name','resolver_remarks','madeAt','resolvedAt']
      }).then(result=>{
        
            res.json({message:"All complaints are: ",result})
      })
      .catch(err=>{
          console.log(err)
      })
})

router.get('/resolvedby/:id',requireLogin,(req,res)=>{
    const resolver = req.params.id;
    Complaint.findAll({where:{
        resolver_id: resolver
    }})
    .then(result=>{
        res.json({result})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router