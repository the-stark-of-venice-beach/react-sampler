// --------------- 3rd party modules ---------------

const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const path = require("path");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs = require("fs");

const pg = require('pg');

const conString =
'postgres://nipjwpye:_UpXKJTMZQhtyiV4l-9AJa1ME8oi3xy2@nutty-custard-apple.db.elephantsql.com:5432/nipjwpye';

const client = new pg.Client(conString);


// --------------- local imports ---------------

const userController = require('./controllers/userController.js');
const database = require('./database.js');

// local variables ---------------
const port = process.env.PORT || 3001;

// --------------- routers ---------------

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  // res.send("hello world!");
  res.sendFile(path.join(__dirname + "./../client/index.html"));
});

app.get("/build/bundle.js", function(req, res) {
  // res.send("hello world!");
  res.sendFile(path.join(__dirname + "./../build/bundle.js"));
});


app.post("/user", jsonParser, userController.createUser, (req, res) => {
  if (res.locals.player) {
    // res.cookie("playerID", res.locals.player.player); // TODO
    res.json(res.locals.user);
  } else {
    res.status(404);
    res.send("No database configured for USER!");
  }
});

app.get("/quiz/:id", (req, res) => {
  const quizID = req.params.id;

  if (quizID !== "0") {
    res.status(404);
    res.send(`Quiz ${quizID} not found!`);
    return;
  }

  const sampleQuiz = JSON.parse(
    fs.readFileSync("./server/model/quiz-demo.json", "utf-8")
  );

  res.json(sampleQuiz);
});


database.connect(err => {
  console.log("connected?");
  console.log(`err: ${err}`);
});

server.listen(port, () => {
  console.log(`listening on PORT:${port}…`);
});

