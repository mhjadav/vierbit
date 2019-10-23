var mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    access_rights: [{
        type: String,
        required: true
    }],
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
var Role = module.exports = mongoose.model('Role', roleSchema);
module.exports.get = function (callback, limit) {
    Role.find(callback).limit(limit);
}