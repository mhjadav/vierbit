var mongoose = require('mongoose');
var storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    domain: {
        id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true,
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
var Store = module.exports = mongoose.model('Store', storeSchema);
module.exports.get = function (callback, limit) {
    Store.find(callback).limit(limit);
}