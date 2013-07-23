var express = require('express')
  , http = require('http');

var app = express();
app.set('port', process.env.PORT );
app.use(express.bodyParser());

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express app listening on port ' + app.get('port'));
});

app.get('/', function(req, res){
    res.send('hello world');
});