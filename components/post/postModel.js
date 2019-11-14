var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    tags: [{
        type: String
    }],
    images: [{
        type: String
    }],
    views: Number,
    rating: Number,
    domain: {
        id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    author: {
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
    isDeactivated:{
        type: Boolean,
        default: false
    }

});
var Post = module.exports = mongoose.model('Post', postSchema);
module.exports.get = function (callback, limit) {
    Post.find(callback).limit(limit);
}