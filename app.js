const express = require('express');
const load = require('express-load');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middleware/error');
const app = express();


//config
	//template engine
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(cookieParser('server_3'));
	app.use(expressSession());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(methodOverride('_method'))
	app.use(express.static(__dirname + '/public'));


	//routes
	load('models')
		.then('controllers')
		.then('routes')
		.into(app);
	

	app.use(error.notFound);
	app.use(error.serverError);
	

	//port
	app.listen(3000, () => {
		console.log(`Estamos rodando na porta 3000!`);
	});

