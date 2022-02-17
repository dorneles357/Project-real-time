const crypto = require('crypto');

module.exports = function(app){
	const ChatController = {
		index: function(req, res){
			const sala = req.query.sala;
			let hash_sala = sala;
			if(!hash_sala){
				const timestamp = Date.now().toString();
				const md5 = crypto.createHash('md5');
				hash_sala = md5.update(timestamp).digest('hex');
			}
			res.render('chat/index', {sala: hash_sala});
		}
	};
	return ChatController;
};
