const router = require('express').Router();
const schema = require('../tools/validate').login_schema;
const Data = require('../models/data').Data;

router.get('/login', (req, res)=>{
	if (req.session.message) {
		return res.render('login', {danger: req.session.message});
	}
	res.render('login', {danger: ''});
});

router.post('/login', async (req, res)=>{
	try {
		const value = await schema.validateAsync(req.body);
		req.session.message = '';
		Data.login(value.username, value.matricule, value.password).then(() =>{
			req.session.keys_data = value;
			res.redirect(301, '/');
		}).catch((err, value_callback)=>{
			console.error(err, value_callback);
			req.session.message = 'Check again your informations';
			res.redirect(301, '/login');
		});
	} catch (err) {
		req.session.message = 'Check again your informations';
		console.error(err);
		res.redirect(301, '/login')
	}
});

module.exports = router;