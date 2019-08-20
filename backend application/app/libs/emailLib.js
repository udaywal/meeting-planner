'use strict';

const nodemailer = require("nodemailer");
const smtptransport = require('nodemailer-smtp-transport');

let sendEmail = (emailDetails) => {

    let account = {
        email : 'baldwitch5@gmail.com',
        password: 'Baldwitch@1'
    }

    let transporter = nodemailer.createTransport(smtptransport({
        host: 'smtp.gmail.com',
        sevice : 'gmail',
        port: 465,
        auth: {
          user: account.email,
          pass: account.password
        }
    }));

    let mailOption = {
        to : emailDetails.email,
        from : account.email,
        subject :emailDetails.subject,
        text : `Hello ${emailDetails.name}
                Welcome to our Meeting Planner application.`,
        html : emailDetails.html        
    }

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = {
    sendEmail: sendEmail
  }