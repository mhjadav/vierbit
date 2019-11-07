const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = `./static/images/${req.body.domain.id}/${req.body.store.id}/products/${req.params.product_id}`;
    cb(null, dir + '/')
  },
  filename: function (req, file, cb) {
    cb(null,  Math.floor(Math.random() * 100) + "-" + Date.now() + "-" + req.body.name + "." + file.mimetype.split('/')[1])
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true)
    }
    else {
      return callback(new Error('Only jpeg and png files are allowed'))
    }
    
  },
  limits: { fileSize: 5 * 1024 * 1024 }
}).array('images', 5);
module.exports = upload;
