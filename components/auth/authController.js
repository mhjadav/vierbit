
const authnService = require('./authService')
const userService = require('../users/usersService')
const bcrypt = require('bcrypt')

// Handle index actions
exports.login = async function (req, res) {

    const user = {
        username : req.body.username,
        password : req.body.password
    }
    console.log(user);

   // const username = req.body.username;
    //const password = req.body.password;
    /* await validateUser(user).then((isValidUser) => {
        if(isValidUser) {
            console.log("user valid : " + isValidUser)
        } else {
           return res.json({message : "Invalid user...."})
        }
    }).catch((error) => {
        res.send("Error : " + error.message);
    }) */

    var isValidUser = await validateUser(user).catch((err) => { res.send("Error: " + err.message) });
    if(isValidUser) {

        await authnService.generateAccessToken(user).then((token) => {
            res.json({
                message: "Token created successfully...",
                token: token
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })

    } else {
        res.json({message: "Invalid user..."})
    }


    


};

function validateUser(loguser) {
    return new Promise( function (resolve,reject) {

         userService.getAllUsers().then((users) => {
            const single_user = users.filter(user => user.username === loguser.username);
            if(single_user.length > 0) {

                bcrypt.compare(loguser.password, single_user[0].password, function(err,res) {
                    if(err) {
                        reject(err)
                    }
                   else if(res) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                 })

            } else {
                resolve(false)
            }
          

           
        }).catch((error) => {
            reject(error);
        })

    })
}