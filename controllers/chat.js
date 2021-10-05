module.exports = function(app){
	const ChatController = {
		index: function(req, res){
			const result = {email:req.params.email,
											user: req.session.user};
			res.render('chat/index', result);
		}
	};
	return ChatController;
};
