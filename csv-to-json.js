var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var fs = require('fs');
var _ = require('underscore');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

var inputFileName = process.argv[2];
var outputFileName = process.argv[3];

var csvData = fs.readFileSync(inputFileName, 'utf-8');
// console.log(csvData);

var csvArr = csvData.split('\n');
var multiArr = [];

for(var i=0 ; i<csvArr.length ; i++){
    multiArr.push(csvArr[i].split(','));
}

var keyArr = multiArr.splice(0,1);
var valueArr = multiArr.splice(0,multiArr.length);

console.log(keyArr);
console.log(valueArr);

var jsonData = [];
for (var i=0 ; i<valueArr.length ; i++){
    jsonData.push(_.object(keyArr[0], valueArr[i]));
}

console.log(jsonData);

fs.writeFileSync(outputFileName, JSON.stringify(jsonData));


var server = app.listen(4956, function() {
    console.log('Express server listening on port ' + server.address().port);
});

