require('dotenv').config()
const jwt = require('jsonwebtoken')

function authenicateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (token === null || token === undefined) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.send(err)
        req.user = user;
        next();
    })
}

module.exports = authenicateToken;