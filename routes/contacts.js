const authenticate = require('./../middleware/authenticator');

module.exports = function(app){
	const contacts = app.controllers.contacts;

	app.get('/contacts', authenticate, contacts.index);
	app.get('/contact/:id', authenticate, contacts.show);
	app.post('/contact', authenticate, contacts.create);
	app.get('/contact/:id/edit', authenticate, contacts.edit);
	app.put('/contact/:id', authenticate, contacts.update);
	app.delete('/contact/:id', authenticate, contacts.destroy);	
};
