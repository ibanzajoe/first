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
// the routes:




app.get('/', function (req, res){
    console.log('hello world');

    Movie.find (function (err, movies){
        res.render('list', {
            title: 'hello',
            message: 'tu mardre',
            movies: movies
        })
    });
});

app.post('/insert', function(req,res){
    var nMovie = new Movie({
        title: req.body.title,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear
    });

    nMovie.save(function(err, nMovie){
        if(err) return console.error(err);
        res.redirect('/')
    });
})

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
           }
    })
})

app.get('/search', function(req, res){
        res.send('POST request to search app');
        Movie.find(function(err, movie) {                      //This is the "find" method on mongoose that returns all value under the "movies" document
        if (err) return console.error(err);                 //if error, output error on console.log
        console.dir(movie);                                //if works, output data on console.log
    });
});

app.get('/remove', function(req, res){
    res.send('POST request to remove app');
    Movie.remove({title: 'Thor'}, function(err) {  //this remove from "Movie" the documents that has title: Thor
        console.log('Movie deleted', err);
    });
});


// Find all movies that have a credit cookie.
Movie.find({ hasCreditCookie: true }, function(err, movies) {   //this is using the "find all" method but specificying the "creditCookie" value to only return "true"
    if (err) return console.error(err);
    console.dir(movies);
});
