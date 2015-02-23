var express 			 = require('express');
var app 					 = express();
var port 					 = process.env.PORT || 8080;
var mongoose 			 = require('mongoose');
var passport 			 = require('passport');
var flash    			 = require('connect-flash');
var morgan 				 = require('morgan');
var cookieParser 	 = require('cookie-parser');
var bodyParser		 = require('body-parser');
var session      	 = require('express-session');
var methodOverride = require('method-override');
var database 			 = require('./config/database.js');

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

require('./app/routes')(app);

app.listen(port);
console.log("App listening on port " + port);