const { body } = require('express-validator')
const domainModel = require('./domainModel')

exports.validate = () => {
     return [ 
        body('url', 'Invalid url').exists().isURL().custom((value, {req}) => {
          //  console.log("url : " +value);
          return domainModel.findOne({url:value}).then((domain) => {
              if(domain) {
                if(req.params.domain_id !== domain.id) {
                  return Promise.reject('Url already exists');
                }
              }
          })
        })
       ]   
    
  }

