var mongoose = require('mongoose');
var tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    keywords: [{
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
var Tag = module.exports = mongoose.model('Tag', tagSchema);
module.exports.get = function (callback, limit) {
    Tag.find(callback).limit(limit);
}