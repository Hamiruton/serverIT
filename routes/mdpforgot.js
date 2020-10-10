const router = require('express').Router();
const Data = require('../models/data').Data;
const token = require('../tools/token');
const sendmail = require('../tools/mail');

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
            try {
                token.confirm_signup(email, (token_confirm_signup)=>{
                    sendmail(email, token_confirm_signup);
                    req.session.unfound_psw = '';
                    res.redirect(301, '/mdpforgot');
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            // l'adresse mail n'est pas dans la BD
            req.session.unfound_psw = "Retry, Email not found";
            res.redirect(301, '/mdpforgot');
        }
    });
});

router.get('/mdpforgot/:token_mdp', (req, res)=>{
    token.verify_signup(req.params.token_mdp).then(data =>{
        req.session.token_email = data;
        console.log(req.session.token_email);
        res.redirect(301, '/changemdp');
    }).catch(error =>{
        console.error(error);
        return res.send('Ça passe pas');
    });
});

module.exports = router;