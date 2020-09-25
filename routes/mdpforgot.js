const router = require('express').Router();
const Data = require('../models/data');
const token = require('../tools/token');
const sendmail = require('../tools/mail');
const { PassThrough } = require('nodemailer/lib/xoauth2');

router.get('/mdpforgot', (req, res)=>{
    if (req.session.unfound_psw) {
        return res.render('mdpforgot', {danger: req.session.unfound_psw});
    }
    res.render('mdpforgot', {danger: ''});
});

router.post('/mdpforgot', (req, res)=>{
    const {email} = req.body;
    Data.get_email(email, (value_callback)=>{
        if (value_callback) {
            req.session.destroy(err=>{
                if (err) {console.error(err);}
                token.confirm_signup(email, (token_confirm_signup)=>{
                    sendmail(email, token_confirm_signup);
                    res.redirect(301, '/mdpforgot');
                });
            });
        } else {
            // l'adresse mail n'est pas dans la BD
            req.session.unfound_psw = "Retry, Email not found";
            res.redirect(301, '/mdpforgot');
        }
    });
});

router.get('/mdpforgot/:token_mdp', (req, res)=>{
    token.verify_signup(token_mdp, (err)=>{
        if (err) {
            console.error(err);
            return res.send('ça passe pas');
            // Ici, le lien entré n'est pas le bon: Page d'erreur
        }
        res.send('Ça marche');
        // Détaillons ce que nous allons juste ici:
        // 1- Créer une page où le user loggera son new mdp et le retype
        // 2- Recevoir ses données et les vérifier à travers joi
        // 3- Crypter le mdp avec bcrypt et insérer le mdp crypté dans la BD
        // 4- Rediriger vers la page login
    });
});

module.exports = router;