// Gérer mes infos sensibles avec des variables d'environnement
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lewisahoumouan@gmail.com',
        pass: '*************' // Entrer mon mdp plus tard
    }
});

function sendmail(email, lien) {
    let mailOptions = {
        from: 'lewisahoumouan@gmail.com',
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