const express = require('express');
const consign = require('consign');
const http = require('http');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middleware/error');

const app = express();
const server = http.Server(app);
const io = socketIO(server);


//config
	//template engine
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(cookieParser('server_3'));
	app.use(expressSession({resave:true, saveUninitialized: true, secret: 'server_3'}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(methodOverride('_method'))
	app.use(express.static(__dirname + '/public'));


	//routes
	consign({})
		.include('models')
		.then('controllers')
		.then('routes')
		.into(app);
	

	app.use(error.notFound);
	app.use(error.serverError);
	
	io.sockets.on('connection', (client) => {
		client.on('send-server', (data) => {
			var msg = "<b>" + data.name + ":</b> " + data.msg + "<br>";
			client.emit('send-client', msg);
			client.broadcast.emit('send-client', msg);
		});
	});

	//port
	server.listen(3000, () => {
		console.log(`Estamos rodando na porta 3000!`);
	});

