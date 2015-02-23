var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');


var app = connect();

app.use(serveStatic("../angularjs"));
app.listen(5000);