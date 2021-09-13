module.exports = function(app){
	const authenticate = require('./../middleware/authenticator');
	const contacts = app.controllers.contacts;

	app.get('/contact', authenticate, contacts.index);
	app.get('/contact/:id', authenticate, contacts.show);
	app.post('/contact', authenticate, contacts.create);
	app.get('/contact/:id/edit', authenticate, contacts.edit);
	app.put('/contact/:id', authenticate, contacts.update);
	app.del('/contact/:id', authenticate, contacts.destroy);	
};
