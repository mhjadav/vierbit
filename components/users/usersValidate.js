const { body } = require('express-validator')
const usersModel = require('./usersModel')
const regex = require('../validation/regex')

exports.validate = () => {
     return [ 
        body('name').exists().withMessage('name can not be empty').matches(regex.nameRegex).withMessage('Inavalid name'),
        body('email').exists().withMessage('email can not be empty').isEmail().withMessage('Inavalid email'),
        body('password','Invalid Password').isLength({min:6, max:20}),
        body('phone','Invalid phone').optional().matches(regex.phoneRegex),
        body('gender','Please select gender').exists(),
        body('username', 'Invalid username name').exists().matches(regex.uniqueNameRegex).custom((value, {req}) => {
          //console.log("parent : " + req.body.);
          if(req.body.parent){
            console.log("I m in If.....");
            return usersModel.findOne({username:value, 'parent.id' : req.body.parent.id}).then((user) => {
              if(user) {
                 // let users = users.find(user => user.parent.username === req.body.parent.username);
                if(req.params.user_id !== user.id) {
                  return Promise.reject('Username already exists');
                }
              }
          })

          } else {
            return usersModel.findOne({username:value, 'parent.id' : undefined}).then((user) => {
              console.log("I m in ELSE.....");
              if(user) {
                 // let users = users.find(user => user.parent.username === req.body.parent.username);
                if(req.params.user_id !== user.id) {
                  return Promise.reject('Username already exists');
                }
              }
          })

          }
         
        })
       ]   
    
  }

