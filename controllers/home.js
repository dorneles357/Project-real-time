module.exports = function(app){
	const HomeController = {
		index: function(req, res){
			res.render('home/index');
		},
		
		login: function(req, res){
			const user = req.body.user;
			const email = req.body.user.email;
			const name = req.body.user.name;

			if(email && name){
				user.contacts = [];
				req.session.user = user;
				res.redirect('/contacts');
			}else{
				res.redirect('/');
			}
		},

		logout: function(req, res){
			req.session.destroy();
			res.redirect('/');
		}
	
	};
	return HomeController;
};
