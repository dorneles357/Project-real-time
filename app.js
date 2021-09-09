const express = require('express');
const load = require('express-load');
const app = express();

//config
	//template engine
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));


	//routes
	load('models')
		.then('controllers')
		.then('routes')
		.into(app);

	//port
app.listen(3000, () => {
	console.log(`Estamos rodando na porta 3000!`);
});
