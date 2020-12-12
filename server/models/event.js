const Sequelize = require('sequelize')
const db = require('../database/db.js')

var eventSchema = db.sequelize.define(
  'event',
  {id: 
    {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  des: {
    type: Sequelize.STRING
  },
  author_id: {
    type: Sequelize.STRING,
    
  },
  author_name: {
    type: Sequelize.STRING,
    default: null
  },
  madeAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  venue: {
    type: Sequelize.STRING,
    default: null
  },
  registration_link: {
    type: Sequelize.STRING,
    default: null
  },
  date: {
    type: Sequelize.DATE,
    default: null
  },
  poster_url: {
    type: Sequelize.STRING,
    
  },
},
{
  timestamps: false
}
)

console.log(eventSchema);

module.exports=eventSchema;