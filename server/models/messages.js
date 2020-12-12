const Sequelize = require('sequelize')
const db = require('../database/db.js')

var chatSchema = db.sequelize.define(
  'messages',
  {id: 
    {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chat_id: {
    type: Sequelize.INTEGER
  },
  sender_id: {
    type: Sequelize.INTEGER
  },
  receiver_id: {
    type: Sequelize.INTEGER,
  },
  message: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
{
  timestamps: false
}
)

console.log(chatSchema);

module.exports=chatSchema;