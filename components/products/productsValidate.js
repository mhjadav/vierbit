const { body } = require('express-validator')
const productModel = require('./productsModel')
const regex = require('../validation/regex')

exports.validate = () => {
     return [ 
         
        body('name', 'Invalid product name').exists().matches(regex.uniqueNameRegex).custom((value, {req}) => {
        
          return productModel.findOne({name:value, 'domain.id': req.body.domain.id, 'store.id': req.body.store.id}).then((product) => {
             
              if(product) {
                if(req.params.product_id !== product.id) {
                  return Promise.reject('Product name already exists');
                }
              }
          })
        }),
        body('description', 'Invalid description').exists().matches(regex.addressDescriptionRegex),
        body('buying_price', 'Invalid buying price').optional().isNumeric(),
        body('selling_price', 'Invalid selling price').optional().isNumeric(),
        body('product_code', 'Invalid product code').optional().matches(regex.productCodeRegex),
        body('quantity', 'Invalid quantity').optional().isInt()
    
       ]
    
  }

