var mongoose = require('mongoose'),
    express = require('express'),
    Movie = require('./schemas/movie'),
    Sites = require('./schemas/sites'),
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
});

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
});
app.get('/request2', function(req, res){
    res.render('urlsearch');
});

app.post('/return2', function(req, res) {
    var xurl = req.body.url;
    console.log(xurl);
    request(xurl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);

            var tits = $('title');
            console.log(tits.text());
            var descript = $('[name^="des"]');
            console.log(descript);
            var nSites = new Sites({
                url: xurl,
                title: tits.text(),
                description: descript.attr('content')
            });
            nSites.save(function (err, nSites) {
                if (err) console.error(err);
                res.redirect('./search')
            });
        }
    });
});

app.get('/search', function(req, res) {
    Sites.find(function(err, sites) {                      //This is the "find" method on mongoose that returns all value under the "movies" document
        if (err) return console.error(err);                 //if error, output error on console.log
        res.send(sites);
    });
});
