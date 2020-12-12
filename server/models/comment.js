const Sequelize = require('sequelize')
const db = require('../database/db.js')

var commentSchema = db.sequelize.define(
  'comments',
  {post_id: 
    {
    type: Sequelize.INTEGER,
    default: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    default: true
  },
  user_name: {
    type: Sequelize.STRING,  
  },

  comment: {
    type: Sequelize.STRING,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    
  },
  madeAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
{
  timestamps: false
}
)

console.log(commentSchema);

module.exports=commentSchema;