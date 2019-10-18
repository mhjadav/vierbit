let  ProductModel = require('./productsModel');
let fs = require('fs');

exports.getAllProducts = function () {

    return new Promise(function (resolve, reject) {
        ProductModel.get(function (err, products) {
            if (products) {
                resolve(products)
            } else {
                reject(err);
            }
        });
    })


}

exports.addProduct = function (productDetail, files) {
    console.log(files);

    var product = new ProductModel();
    product.name = productDetail.name;
    product.description = productDetail.description;

    product.tags = productDetail.tags;
    product.buying_price = productDetail.buying_price;
    product.selling_price = productDetail.selling_price;

    files.forEach(element => {
        //console.log("from Service : " + element);
        product.images.push(element.filename);
        
    });
    //product.images = productDetail.images;
    product.product_code = productDetail.product_code;
    product.rating = productDetail.rating;
    product.quantity = productDetail.quantity;
    product.domain_id = productDetail.domain_id;
    product.domain_name = productDetail.domain_name;
    
    product.created_date = Date.now();
    product.isDeactivated = productDetail.isDeactivated ? productDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        product.save(function (err) {

            if (!err) {
                resolve(product);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeProduct = function (id) {

    return new Promise(function (resolve, reject) {
        ProductModel.remove({
            _id: id
        }, function (err) {
            if (!err) {
                resolve("product Deleted Successfully");
            } else {
                reject(err);
            }
        });

    })


}

exports.findProduct = function (id) {

    return new Promise(function (resolve, reject) {
        ProductModel.findById(id, function (err, product) {
            console.log(product);
            if (product) {
                resolve(product);
            } else {
                reject(err);
            }
        });
    });


}

exports.updateProduct = function (id, productDetail, files) {

    return new Promise(function (resolve, reject) {

        ProductModel.findById(id, function (err, product) {

            if (err) {
                reject(err);
            } else {
                product.name = productDetail.name;
                const p = new Promise((resolve, reject) => {
                    resolve(RemovePhotos(product.images));
                  });
              
               p.then(() => {
                product.images = [];
                files.forEach(element => {
                    product.images.push(element.filename);
                    
                });

                
                product.description = productDetail.description;
                product.tags = productDetail.tags;
                product.buying_price = productDetail.buying_price;
                product.selling_price = productDetail.selling_price;
                product.product_code = productDetail.product_code;
                product.rating = productDetail.rating;
                product.quantity = productDetail.quantity;
                product.domain_id = productDetail.domain_id;
                product.domain_name = productDetail.domain_name;
                
                product.created_date = productDetail.created_date;
                product.isDeactivated = productDetail.isDeactivated ? productDetail.isDeactivated : false;
                // save the product and check for errors
                product.save(function (err) {
                    if (!err) {
                        resolve(product);
                    } else {
                        reject(err);
                    }
                });
               })
              

            }

        });

    });
}

function RemovePhotos(images){
    let path = './components/uploads/';
    images.forEach(element => {
        fs.unlink(path+element, (err) => {
            if (err) throw err;
            console.log(path+element + ' file was deleted');
          });
    });

}