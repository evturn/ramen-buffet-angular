var express 			 = require('express');
var port 					 = process.env.PORT || 8080;
var mongoose 			 = require('mongoose');
var http 					 = require('http');
var path 					 = require('path');
var passport 			 = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var morgan 				 = require('morgan');
var cookieParser 	 = require('cookie-parser');
var bodyParser		 = require('body-parser');
var methodOverride = require('method-override');
var database 			 = require('./config/database.js');

mongoose.connect(database.url);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app);


app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
});

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



app.listen(port);
console.log("App listening on port " + port);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}