const multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let dir = `./static/images/${req.body.domain_name}/products/${req.body.name}`;
   
    await makeDir(dir).then((created) => {
      if(created){
        cb(null,dir+'/')
      } else {
        console.log("dir not created...");
      }
    })
    
  },
  filename: function (req, file, cb) {
    console.log("body.....: ");
    console.log(file);
    cb(null, Date.now() + "-" + req.body.name + "." + file.mimetype.split('/')[1])
  }
})

function makeDir(dir) {
  return new Promise(function (resolve, reject) {

    mkdirp(dir, function (err) {
     if(err) {
       reject(false)
     } else {
       resolve(true);
     }
    });
   
  });
}



const upload = multer({ storage: storage }).array('images', 5);
module.exports = upload;
