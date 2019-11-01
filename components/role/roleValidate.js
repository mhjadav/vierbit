const { body } = require('express-validator')
const roleModel = require('./roleModel')

exports.validate = () => {
     return [ 
        body('name', 'Invalid role name').exists().matches(/^[a-zA-Z0-9-_]{6,20}$/).custom((value, {req}) => {
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

