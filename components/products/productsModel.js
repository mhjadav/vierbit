var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    tags: [{
        type: String
    }],
    buying_price: Number,
    selling_price: Number,
    images: [{
        type: String
    }],
    product_code: String,
    rating: Number,
    quantity: Number,
    domain: {
        id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    store: {
        id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    isDeactivated: Boolean

});
var Product = module.exports = mongoose.model('Product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}