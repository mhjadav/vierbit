const { body } = require('express-validator')
const postModel = require('./postModel')
const regex = require('../validation/regex')

exports.validate = () => {
  return [

    body('title', 'Invalid post title').exists().matches(regex.uniqueNameRegex).custom((value, { req }) => {

      return postModel.findOne({ title: value, 'domain.id': req.body.domain.id }).then((post) => {

        if (post) {
          if (req.params.post_id !== post.id) {
            return Promise.reject('post title already exists');
          }
        }
      })
    }),
    body('description', 'Invalid description').exists().matches(regex.addressDescriptionRegex)

  ]


}

