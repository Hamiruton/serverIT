const router = require('express').Router();
const schema = require('../tools/validate').changepsw_schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Data = require('../models/data');

router.get('/changemdp', (req, res)=>{
    if (req.session.message) {
        return res.render('changemdp', {danger: req.session.message});
    }
    res.render('changemdp', {danger: ''});
});

router.post('/changemdp', async (req, res)=>{
    try {
        let value = await schema.validateAsync(req.body);
        bcrypt.hash(value.psw, saltRounds, (err, hash)=>{
            if (err) throw err;
            value.psw = hash;
            Data.change_psw(value.psw, req.session.token_email).then((results)=>{
                console.log(req.session.token_email);
                res.redirect(301, '/login');
            }).catch(err =>{
                console.error(err);
            });
        });
        
    } catch (error) {
        req.session.message = "Passwords are not the same";
        res.redirect(301, '/changemdp');
    }
});

module.exports = router;