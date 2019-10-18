var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
   role: mongoose.Schema.Types.ObjectId,
    gender: {
        type: String,
        required: true
    },
    created_date: {
        type: Date
    },
    updated_date: {
         type: Date,
         default: Date.now
     },
    isDeactivated: Boolean
});
var User = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}