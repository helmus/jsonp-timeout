var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var jsonp_timeout = 2000;

var app = express();
app.set('port', process.env.PORT );
app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/bower_components')));

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express app listening on port ' + app.get('port'));
});

var condition = 0;
app.get('/rpc.js', function(req, res){
    if (!req.query.callback){
        res.send(400, { error: 'no callback' });
        res.end();
        return;
    }
    setTimeout(function(){
        condition++;
        if (condition % 4 === 0){
            var rpcJsonp = fs.createReadStream("rpc.js");
            rpcJsonp.pipe(res, { end: false });
            rpcJsonp.on("end", function(){
                    res.write("\n");
                    res.write(req.query.callback + "('data')");
                    res.end();
                });
        }else{
            res.write(req.query.callback + "('timeout')");
            res.end();
        }

    }, jsonp_timeout);
});