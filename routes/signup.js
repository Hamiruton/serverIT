const router = require('express').Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10; 
const schema = require('../tools/validate').signup_schema;
const Data = require('../models/data');
const token = require('../tools/token');
const sendmail = require('../tools/mail');

router.get('/signup', (req, res)=>{
	if (req.session.message) {
		return res.render('signup', {danger:req.session.message});
	}
		res.render('signup', {danger: ''});
});

router.post('/valid', async (req, res)=>{
    try {
    	const value = await schema.validateAsync(req.body);
		// Supprimer la variable session message
        req.session.destroy(e =>{
			if (e) { console.error(e) }
			// Crypter le password
			bcrypt.hash(value.password, saltRounds, (err, hash)=>{
				if (err) throw err;
				value.password = hash;
				// Insérer dans la BD
				const inscrip = new Data(value);
				inscrip.signup(()=>{
					// Envoi du lien par mail
					token.confirm_signup(value.email, (token_confirm_signup)=>{
						sendmail(value.email, token_confirm_signup);
						// Rediriger vers la page de connexion
						res.redirect(301, '/login');
					});
				});
			});	
        })
    } catch (err) {
    	req.session.message = 'Check again your informations';
    	res.redirect(301,'/signup');
    }
});

router.get('/signup/:confirm_signup_link', (req, res)=>{
	token.verify_signup(req.params.confirm_signup_link).then(data =>{
		Data.modify_confirm_email(data, ()=>{
			res.redirect(301, '/login');
		});
	}).catch(error => {
		console.error(error);
		return res.send('ça passe pas');
	})
});

module.exports = router;
