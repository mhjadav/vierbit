const PostUploadService = require('./postUploadService');
const logger = require('../../logger');


exports.update = async function (req, res) {

        await PostUploadService.updatePost(req.params.post_id, req.files).then((post) => {
            res.json({
                message: "Images uploaded successfully",
                data: post
            })
        }).catch((error) => {
            logger.error(error);
            res.send("Error : " + error.message);
        })

};

