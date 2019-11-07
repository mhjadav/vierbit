const { body } = require('express-validator')
const storeModel = require('./storesModel')
const regex = require('../validation/regex')

exports.validate = () => {
     return [ 
        body('name', 'Invalid store name').exists().matches(regex.uniqueNameRegex).custom((value, {req}) => {
          return storeModel.findOne({name:value, 'domain.id': req.body.domain.id}).then((store) => {
             
              if(store) {
                if(req.params.store_id !== store.id) {
                  return Promise.reject('Store name already exists');
                }
              }
          })
        }),
        body('city', 'Invalid city').exists(),
        body('state', 'Invalid state').exists(),
        body('address', 'Invalid address').exists().matches(regex.addressDescriptionRegex),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone', 'Invalid mobile number').exists().matches(regex.phoneRegex),
        body('pincode', 'Invalid pincode').exists().matches(regex.pincodeRegex)
       ]   
    
  }

