
const RoleService = require('./roleService')
const { validationResult } = require('express-validator');

exports.index = async function (req, res) {
    await RoleService.getAllRole().then((roles) => {
        res.json({
            message: "Data fetched successfully",
            data: roles
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

        await RoleService.addRole(req.body).then((role) => {
            res.json({
                message: "New record addded successfully",
                data: role
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })


    } catch (err) {
        return next(err)
    }

};

exports.view = async function (req, res) {
    await RoleService.findRole(req.params.role_id).then((message) => {
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
        await RoleService.updateRole(req.params.role_id, req.body).then((role) => {
            res.json({
                message: "Record updated successfully",
                data: role
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })

    } catch (err) {
        return next(err)
    }
};

exports.deactivate = async function (req, res) {

    await RoleService.deactivateRole(req.params.role_id).then((role) => {
        res.json({
            message: "Role deactivated successfully"
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.delete = async function (req, res) {

    await RoleService.removeRole(req.params.role_id, req.body).then((message) => {
        res.json({
            Message: message
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })
}