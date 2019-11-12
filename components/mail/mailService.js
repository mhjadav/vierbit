const nodemailer = require('nodemailer')
var _loadah = require('lodash');

exports.sendMail = function (req, emailconfig) {
    return new Promise(function (resolve, reject) {
        var fromEmail = emailconfig.auth.username;
        var transporter = nodemailer.createTransport(emailconfig);

        const formInputs = req.body;

          if (formInputs['form_botcheck'] !== '') {
             // resolve({ Location: `${origin}/404` });
             reject("Unathorized access")
  
          } 
        let emailBody = '<div>Hello,<br/><br/>';
        const ignoreKeys = ['esubject', 'to', 'redirect', 'form_botcheck'];
        Object.keys(formInputs).forEach((key) => {
            if (ignoreKeys.indexOf(key) <= -1) {
                emailBody += `${_loadah.capitalize(_loadah.replace(key, '-', ' '))}: <br/> ${formInputs[key]}<br/><br/>`;
            }
        });
        emailBody += '</div>';
        const mailOptions = {
            from: `"New Message" ${fromEmail}`,
            to: req.body.to,
            replyTo: req.body['email-address'] || req.body.email || fromEmail,
            subject: `[Nirlom]:${req.body.esubject}`,
            html: emailBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve("Email sent successfully");
            }
        });
        // resolve({ Location: `${origin}${req.body.redirect}` });


    })
}



