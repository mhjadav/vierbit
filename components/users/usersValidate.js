const { body } = require('express-validator')
const usersModel = require('./usersModel')
const regex = require('../validation/regex')

exports.validate = () => {
     return [ 
        body('name').exists().withMessage('name can not be empty').matches(regex.nameRegex).withMessage('Inavalid name'),
        body('email').exists().withMessage('email can not be empty').isEmail().withMessage('Inavalid email').custom((value, {req}) => {
          return usersModel.findOne({email : value}).then((user) => {
            if(user){
              if(req.params.user_id !== user.id){
                return Promise.reject("Email already exists");
              }
            }
          })
        }),
        body('password','Invalid Password').isLength({min:6, max:20}),
        body('phone','Invalid phone').optional().matches(regex.phoneRegex).custom((value, {req}) => {
          return usersModel.findOne({phone : value}).then((user) => {
            if(user) {
              if(req.params.user_id !== user.id) {
                return Promise.reject("Phone number already exists");
              }
            }
          })
        }),
        body('gender','Please select gender').exists(),
        body('username', 'Invalid username name').exists().matches(regex.uniqueNameRegex).custom((value, {req}) => {
          if(req.body.parent){
            return usersModel.findOne({username:value, 'parent.id' : req.body.parent.id}).then((user) => {
              if(user) {
                if(req.params.user_id !== user.id) {
                  return Promise.reject('Username already exists');
                }
              }
          })
          } else {
            return usersModel.findOne({username:value, 'parent.id' : undefined}).then((user) => {
              if(user) {
                if(req.params.user_id !== user.id) {
                  return Promise.reject('Username already exists');
                }
              }
          })

          }
         
        })
       ]   
    
  }

