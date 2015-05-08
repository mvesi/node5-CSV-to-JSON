var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var fs = require('fs');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

var server = app.listen(4956, function() {
	console.log('Express server listening on port ' + server.address().port);
});
