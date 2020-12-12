const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const { Op } = require("sequelize");
const User = require("../models/user");
const ChatRoom = require("../models/chatroom");
const Message = require("../models/messages");
const requireLogin = require("../middleware/requireLogin");
const user = require("../models/user");

router.post("/sendMessage/:receiver_id", requireLogin, (req, res) => {
  const receiver = req.params.receiver_id;
  const { message } = req.body;
  const sender = req.user.dataValues.id;
  const today = new Date();
  const sname = req.user.dataValues.full_name;
  if (!message) {
    return res.status(422).json({ error: "Enter a message" });
  }

  ChatRoom.findOne({
    where: {
      [Op.or]: [
        {
          sender_id: { [Op.like]: sender },
          receiver_id: { [Op.like]: receiver },
        },
        {
          sender_id: { [Op.like]: receiver },
          receiver_id: { [Op.like]: sender },
        },
      ],
    },
  })
    .then((chat) => {
      if (!chat) {
        User.findOne({where:{
          id:receiver
        }})
        .then(result=>{
          const rname = result.full_name
          console.log(rname.full_name)
        
        ChatRoom.create({
          sender_id: sender,
          receiver_id: receiver,
          lastmsg: message,
          lastmsgAt: today,
          lastmsgsender: sender,
          r_name:rname,
          s_name:sname,
          
        })
          .then((chat) => {
            console.log("Chatroom created");
            Message.create({
              chat_id: chat.chat_id,
              sender_id: sender,
              receiver_id: receiver,
              message,
            })
              .then((created) => {
                res.json({ message: "Message is sent" });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        })
      } else {
        chat.lastmsg = message;
        chat.lastmsgAt = today;
        chat.lastmsgsender = sender;
        Message.create({
          chat_id: chat.chat_id,
          sender_id: sender,
          receiver_id: receiver,
          message,
        })
          .then((created) => {
            chat.save();
            res.json({ message: "Message is sent" });
          })
          .catch((err) => {
            console.log(err);
          });
        //res.json({message:"Chatroom exists"})
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getAllMessages/:receiver_id", requireLogin, (req, res) => {
  const receiver = req.params.receiver_id;
  const sender = req.user.dataValues.id;
console.log(sender)

  ChatRoom.findOne({
    where: {
      [Op.or]: [
        {
          sender_id: { [Op.like]: sender },
          receiver_id: { [Op.like]: receiver },
        },
        {
          sender_id: { [Op.like]: receiver },
          receiver_id: { [Op.like]: sender },
        },
      ],
    },
  }).then((chat) => {
    if (!chat) {
      return res.json({ error: "No messages found" });
    }
    Message.findAll({
      where: {
        chat_id: chat.chat_id,
      },
    })
      .then((messages) => {
        res.json({ message: "Messages returned", messages });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/getAllRoom", requireLogin, (req, res) => {
  const userId = req.user.dataValues.id;
  ChatRoom.findAll({
    where: {
      [Op.or]: [
        {
          sender_id: { [Op.like]: userId },
        },
        {
          receiver_id: { [Op.like]: userId },
        },
      ],
    },
  })
    .then((result) => {
      if (!result) {
        return res.json({ error: "No Chatroom Found" });
      }

      res.json({ message: "Chatrooms Found:", result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;