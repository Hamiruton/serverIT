const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function sendmail(email, lien) {
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Sign up confirmation',
        html: 
        `
            <h1>${lien}</h1>
        `
    }
    
    transporter.sendMail(mailOptions, (err, info)=>{
        if (err) {
            console.error(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendmail;