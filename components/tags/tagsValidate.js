const { body } = require('express-validator')
const tagModel = require('./tagsModel')
const regex = require('../validation/regex')

exports.validate = () => {
     return [ 
        body('name', 'Invalid tag name').exists().matches(regex.tagRegex).custom((value, {req}) => {
          return tagModel.findOne({name:value}).then((tag) => {
              if(tag) {
                if(req.params.tag_id !== tag.id) {
                  return Promise.reject('tag name already exists');
                }
              }
          })
        })
       ]
  }

