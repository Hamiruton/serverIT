const Joi = require('joi');

const signup_schema = Joi.object({
	last_name: Joi.string().max(30).required(),
	first_name: Joi.string().max(30).required(),
	username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9çéèêëïîÉÈÊËÎÏ_@#-]+$')).max(15).required(),
	email: Joi.string().email().required(),
	matricule: Joi.string().pattern(new RegExp('^[0-9]{2}-ESATIC[0-9]{4}[A-Z]{2}$')).required(),
	gender: Joi.string().max(1).required(),
	birthdate: Joi.string().pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')),
	commune: Joi.string().alphanum().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9çéèêëïîÉÈÊËÎÏ_@#-]+$')).required(),
	confirm_password: Joi.ref('password')
});

const login_schema = Joi.object({
	username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9çéèêëïîÉÈÊËÎÏ_@#-]+$')).max(15).required(),
	matricule: Joi.string().pattern(new RegExp('^[0-9]{2}-ESATIC[0-9]{4}[A-Z]{2}$')).required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9çéèêëïîÉÈÊËÎÏ_@#-]+$')).required()
});

module.exports = {
	signup_schema: signup_schema,
	login_schema: login_schema
};