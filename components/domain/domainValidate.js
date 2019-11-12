const { body } = require('express-validator')
const domainModel = require('./domainModel')
const regex = require('../validation/regex')

exports.validate = () => {
     return [ 
        body('url', 'Invalid url').exists().isURL().custom((value, {req}) => {
          //  console.log("url : " +value);
          return domainModel.findOne({url:value}).then((domain) => {
              if(domain) {
                if(req.params.domain_id !== domain.id) {
                  return Promise.reject('Url already exists')
                }
              }
          })
        }),
        body('emailConfig.host', 'Invalid host').exists().isURL(),
        body('emailConfig.port', 'Invalid port').exists().matches(regex.portRegex),
        body('emailConfig.auth.user', 'Invalid email').exists().isEmail(),
        body('emailConfig.auth.pass', 'Invalid Password').exists()

       ]   
    
  }

