const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {id: 
    {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: Sequelize.STRING
  },
 
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  pic: {
    type: Sequelize.STRING,
    defaultValue:"https://res.cloudinary.com/shivani19/image/upload/v1600164675/no_pic_gerkf3.png"
  },
  utype:{
    type: Sequelize.STRING
  }
},
{
  timestamps: false

})