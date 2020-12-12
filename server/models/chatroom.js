const Sequelize = require('sequelize')
const db = require('../database/db.js')

var chatSchema = db.sequelize.define(
  'chatrooms',
  {chat_id: 
    {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sender_id: {
    type: Sequelize.INTEGER,
    
    
  },
  receiver_id: {
    type: Sequelize.INTEGER,
    
  },
  lastmsg: {
    type: Sequelize.STRING,
    
    
  },
  lastmsgAt: {
    type: Sequelize.DATE,
    
    
  },
  lastmsgsender: {
    type: Sequelize.INTEGER,
    
    
  },
  r_name: {
    type: Sequelize.STRING,
    
    
  },
  s_name: {
    type: Sequelize.STRING,
    
    
  },
},
{
  timestamps: false
}
)

console.log(chatSchema);

module.exports=chatSchema;