const UsersService = require('./usersService')
const { validationResult } = require('express-validator')
// Handle index actions
exports.index = async function (req, res) {
    await UsersService.getAllUsers().then((users) => {
        res.json({
            message: "Data fetched successfully",
            data: users
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.new = async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        await UsersService.addUser(req.body).then((user) => {
            res.json({
                message: "New record addded successfully",
                data: user
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })
    } catch (err) {
        return next(err)
    }


};

exports.view = async function (req, res) {

    await UsersService.findUser(req.params.user_id).then((message) => {
        res.send(message);
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.update = async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        await UsersService.updateUser(req.params.user_id, req.body).then((user) => {
            res.json({
                message: "Record updated successfully",
                data: user
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })

    } catch (err) {
        return next(err)
    }


};

exports.deactivate = async function (req, res) {

    await UsersService.deactivateUser(req.params.user_id).then((user) => {
        res.json({
            message: "User deactivated successfully"
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })
};


exports.delete = async function (req, res) {

    await UsersService.removeUser(req.params.user_id, req.body).then((message) => {
        res.json({
            Message: message
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })



}