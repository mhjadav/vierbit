var mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    access_rights: [{
        type: String
    }],
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    isDeactivated: {
         type: Boolean,
         default: false
         }
});
var Role = module.exports = mongoose.model('role', roleSchema);
module.exports.get = function (callback, limit) {
    Role.find(callback).limit(limit);
}