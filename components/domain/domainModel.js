var mongoose = require('mongoose');
var domainSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        lowercase: true,
    },
    user: {
        id: mongoose.Schema.Types.ObjectId,
        username: String
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
var Domain = module.exports = mongoose.model('Domain', domainSchema);
module.exports.get = function (callback, limit) {
    Domain.find(callback).limit(limit);
}