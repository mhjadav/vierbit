require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.generateAccessToken = function (user) {

    return new Promise(function (resolve, reject) {

        jwt.sign({ user: user }, process.env.ACCESS_SECRET_TOKEN, (err, token) => {
            if(err) reject(err)

            resolve(token);
        });
    })
}