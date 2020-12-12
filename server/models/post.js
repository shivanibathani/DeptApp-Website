const Sequelize = require('sequelize')
const db = require('../database/db.js')

var postSchema = db.sequelize.define(
  'post',
  {id: 
    {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING,
    
  },
  postedbyID: {
    type: Sequelize.STRING,
    default: null
  },
  madeAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  postedbyName: {
    type: Sequelize.STRING,
    default: null
  },

},
{
  timestamps: false
}
)

console.log(postSchema);

module.exports=postSchema;