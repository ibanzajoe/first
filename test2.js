var mongoose = require('mongoose'),
    express = require('express'),
    Movie = require('./schemas/movie'),
    bodyParser = require('body-parser'),
    request = require('request'),
    cheerio = require('cheerio');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
});
var app = express();
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('example app listening at http://%s:%s', host, port);
});
mongoose.connect('mongodb://localhost/test');

app.get('/request', function(req, res){
    res.render('urlsearch');
})

app.post('/return', function(req, res){
    var xurl = req.body.url;
    console.log(xurl);
    request(xurl, function (error, response, body){
        if (!error && response.statusCode == 200){
            $ = cheerio.load(body);
            console.log($);
            var descript = $('meta[name=description]').attr('content');
            console.log(descript);
        }
    })
})
app.get('/request2', function(req, res){
    res.render('urlsearch');
})

app.post('/return2', function(req, res){
    var xurl = req.body.url;
    console.log(xurl);
    request(xurl, function (error, response, body){
        if (!error && response.statusCode == 200){
            $ = cheerio.load(body);

            var descript = $('input[type="text"]');
            console.log(descript.val());
        }
    })
})
