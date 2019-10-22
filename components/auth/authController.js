
const authnService = require('./authService')

// Handle index actions
exports.login = async function (req, res) {

    const user = {
        username : "nikunj",
        password : "Pass123"
    }


    await authnService.generateAccessToken(user).then((token) => {
        res.json({
            message: "Token created successfully...",
            token: token
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};