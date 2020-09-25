const router = require('express').Router();
const schema = require('../tools/validate').login_schema;
const Data = require('../models/data');

router.get('/login', (req, res)=>{
	if (req.session.message) {
		return res.render('login', {danger: req.session.message});
	}
	res.render('login', {danger: ''});
});

router.post('/login', async (req, res)=>{
	try {
		const value = await schema.validateAsync(req.body);
		//Vérifier si les infos entrées existent dans la BD
		//Si oui, rediriger le user vers sa page d'accueil
		//Sinon, le ramener sur la page login
		req.session.destroy(e =>{
			if (e) {console.error(e);}
			Data.login(value.username, value.matricule, value.password, (value_callback)=>{
				if (value_callback){
					res.send('Données affichées');
					//res.redirect(301, '/');
				} else {
					//res.send('Données non retrouvées');
					res.redirect(301, '/login');
				}
			});
		})
	} catch (err) {
		req.session.message = 'Check again your informations';
		console.error(err);
		res.redirect(301, '/login')
	}
});

module.exports = router;