const multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: async function (req, file, cb) {
   //console.log("body : ", req.body);
    let dir = `./static/images/${req.body.domain.name}/${req.body.store.name}/products/${req.body.name}`;

    await makeDir(dir).then((created) => {
      if (created) {
        cb(null, dir + '/')
      } else {
        console.log("dir not created...");
      }
    })

  },
  filename: function (req, file, cb) {
    cb(null,  Math.floor(Math.random() * 100) + "-" + Date.now() + "-" + req.body.name + "." + file.mimetype.split('/')[1])
  }
})

function makeDir(dir) {
  return new Promise(function (resolve, reject) {

    mkdirp(dir, function (err) {
      if (err) {
        reject(false)
      } else {
        resolve(true);
      }
    });

  });
}

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
