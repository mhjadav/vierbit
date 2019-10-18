var mongoose = require('mongoose');
var domainSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    user: mongoose.Schema.Types.ObjectId,
    created_date: Date,
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