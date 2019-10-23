
const StoreService = require('./storesService')

exports.index = async function (req, res) {

    await StoreService.getAllStore().then((stores) => {
        res.json({
            message: "Data fetched successfully",
            data: stores
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.new = async function (req, res) {

    
    await StoreService.addStore(req.body).then((store) => {
        res.json({
            message: "New record addded successfully",
            data: store
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.view = async function (req, res) {
    await StoreService.findStore(req.params.store_id).then((store) => {
        res.json({
            message : "store fetched successfully...",
            store: store
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.update = async function (req, res) {

    await StoreService.updateStore(req.params.store_id, req.body).then((store) => {
        res.json({
            message: "Record updated successfully",
            data: store
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.delete = async function (req, res) {

    await StoreService.removeStore(req.params.store_id).then((message) => {
        res.json({
            "message": message
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })



}