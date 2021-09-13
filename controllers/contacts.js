module.exports = function(app){
	const ContactsController = {

		index: function(req, res){
			const contacts = req.session.user;
			const user = req.session.user;
			const params = {user:user};

			res.render('contacts/index', params);
	
			},
		
		create: function(req, res){
			let contact = req.body.contact;
			let user = req.session.user;

			user.contacts.push(contact)
			res.redirect('/contacts');
			},

		show:function(req, res){
			const id = req.params.id;
			let contact = req.session.user.contacts[id];
			const params = {contact: contact, id: id};

			res.render('contacts/show');
			},

		edit: function(req, res){
			const id = req.params.id;
			const user = req.session.user
			const contact = user.contacts[id];
			const params = {user: user, contact: contact, id: id};

			res.render('contacts/edit', params);
			},

		update: function(req, res){
			const contact = req.body.contact;
			const user = req.session.user;

			user.contacts[req.params.id] = contact;
			res.redirect('/contacts');
			},

		destroy: function(req, res){
			const user = req.session.user;
			const id = req.params.id;

			user.contacts.splice(id, 1);
			res.redirect('/contacts');
			}
		}
	return ContactsController;
}
