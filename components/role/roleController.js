
const  RoleService = require('./roleService')
const RoleValidate = require('./roleValidate')
// Handle index actions
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

    await RoleValidate.validate(req.body).then(() => {
         RoleService.addRole(req.body).then((role) => {
            res.json({
                message: "New record addded successfully",
                data: role
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })

   
   


};

exports.view = async function (req, res) {

    await RoleService.findRole(req.params.role_id).then((message) => {
        res.send(message);
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.update = async function (req, res) {

    await RoleService.updateRole(req.params.role_id, req.body).then((role) => {
        res.json({
            message: "Record updated successfully",
            data: role
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