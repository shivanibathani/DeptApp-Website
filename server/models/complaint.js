const Sequelize = require('sequelize')
const db = require('../database/db.js')

var complaintSchema = db.sequelize.define(
  'complaint',
  {id: 
    {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  complaint: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  user_name: {
    type: Sequelize.STRING
  },
  resolver_id: {
    type: Sequelize.INTEGER
  },
  resolver_name: {
    type: Sequelize.STRING
  },
  resolver_remarks: {
    type: Sequelize.STRING
  },
  madeAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  resolvedAt: {
    type: Sequelize.DATE
  }
},
{
  timestamps: false
}
)

console.log(complaintSchema);

module.exports=complaintSchema;