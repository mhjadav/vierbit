
const MailService = require('./mailService')
const domainModel = require('../domain/domainModel')
const urlParser = require('url');

exports.sendMail = async function (req, res) {

    var origin = urlParser.parse(req.get('referer') || req.get('origin')).host;

        domainModel.findOne({url : origin}, function(err, domain){
            if(err) res.send("Error : " + err.message);
            else {
                MailService.sendMail(req, domain.emailConfig).then((msg) => {
                    /*  res.writeHead(302, obj);
                     res.end(); */
                     res.send("message : " + msg);
                 }).catch((error) => {
                     res.send("Error : " + error.message);
                 })

            }
           

        })
      
};





