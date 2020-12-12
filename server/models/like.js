const Sequelize = require('sequelize')
const db = require('../database/db.js')

var postSchema = db.sequelize.define(
  'likes',
  {post_id: 
    {
    type: Sequelize.INTEGER,
    default: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    default: true
  },
  userf_name: {
    type: Sequelize.STRING,
    
  },
 
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    
  },
  // tot_likes: {
  //   type: Sequelize.STRING,
    
  // },
},
{
  timestamps: false
}
)

console.log(postSchema);

module.exports=postSchema;