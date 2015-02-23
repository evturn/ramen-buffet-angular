var express 			 = require('express');
var port 					 = process.env.PORT || 3000;
var mongoose 			 = require('mongoose');
var http 					 = require('http');
var path 					 = require('path');
var passport 			 = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var morgan 				 = require('morgan');
var cookieParser 	 = require('cookie-parser');
var bodyParser		 = require('body-parser');
var methodOverride = require('method-override');
var database 			 = require('./config/database.js');

mongoose.connect(database.url);

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "admin") {
      return done(null, {name: "admin"});
    }
    return done(null, false, { message: 'Incorrect username.' });
  }
));

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./app/routes.js')(app);

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.get('/users', auth, function(req, res){
  res.send([{name: "user1"}, {name: "user2"}]);
});

app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

app.listen(port);
console.log("App listening on port " + port);