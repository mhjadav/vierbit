
Service = require('./roleService')
// Handle index actions
exports.index = async function (req, res) {
    await Service.getAllRole().then((roles) => {
        res.json({
            message: "Data fetched successfully",
            data: roles
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.new = async function (req, res) {

    await Service.addRole(req.body).then((role) => {
        res.json({
            message: "New record addded successfully",
            data: role
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.view = async function (req, res) {

    await Service.findRole(req.params.role_id).then((message) => {
        res.send(message);
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.update = async function (req, res) {

    await Service.updateRole(req.params.role_id, req.body).then((role) => {
        res.json({
            message: "Record updated successfully",
            data: role
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.delete = async function (req, res) {

    await Service.removeRole(req.params.role_id, req.body).then((message) => {
        res.json({
            Message: message
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })



}