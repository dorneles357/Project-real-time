require('dotenv/config');
const express = require("express");
const path = require("path");
const consign = require("consign");
const http = require("http");
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const error = require("./middleware/error");
const config = require("./config");
const mongoose = require("mongoose");

const url = process.env.DB_DEV;

mongoose.connect(url)
  .then(() => {
    console.log("Connected Successful")
  })
  .catch((err) => {
    console.log(`Error in the Connection: ${err}`)
  });


const app = express();
const server = http.Server(app);
const io = socketIO(server);
const store = new expressSession.MemoryStore();

//config
//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser("server_3"));
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    name: config.sessionkey,
    secret: config.sessionSecret,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

io.use((socket, next) => {
  const cookieData = socket.request.headers.cookie;
  const cookieObj = cookie.parse(cookieData);
  const sessionHash = cookieObj[config.sessionkey] || "";
  const sessionID = sessionHash.split(".")[0].slice(2);

  store.all((err, sessions) => {
    const currentSession = sessions[sessionID];
    if (err || !currentSession) {
      return next(new Error("Acesso negado!"));
    }
    socket.handshake.session = currentSession;
    return next();
  });
});

//routes
consign({})
  .include("models")
  .then("controllers")
  .then("routes")
  .then("events")
  .into(app, io);

app.use(error.notFound);
app.use(error.serverError);

//port
const port = process.env.PORT_DEV;
server.listen(port, () => {
  console.log(`Estamos rodando na porta ${port}!`);
});
