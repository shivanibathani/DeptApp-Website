const Sequelize = require('sequelize')
const db = require('../database/db.js')

var noticeSchema = db.sequelize.define(
  'notice',
  {id: 
    {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  madeAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  notice_url: {
    type: Sequelize.STRING,
    
  },
  author_name: {
    type: Sequelize.STRING,
    default: null
  },
  author_id: {
    type: Sequelize.STRING,
    
  },
},
{
  timestamps: false
}
)

console.log(noticeSchema);

module.exports=noticeSchema;