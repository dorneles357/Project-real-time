module.exports = function(app){
	const HomeController = {
		index: function(req, res){
			res.render('home/index');
		},
		
		login: function(req, res){
			const email = req.body.user;
			const name = req.body.user.name;

			if(email && name){
				const user = req.body.user;

				user['contacts'] = [];
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
