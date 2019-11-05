const { body } = require('express-validator')
const roleModel = require('./roleModel')
const regex = require('../validation/regex')

exports.validate = () => {
     return [ 
        body('name', 'Invalid role name').exists().matches(regex.uniqueNameRegex).custom((value, {req}) => {
          return roleModel.findOne({name:value}).then((role) => {
              if(role) {
                if(req.params.role_id !== role.id) {
                  return Promise.reject('Role name already exists');
                }
              }
          })
        })
       ]   
    
  }

