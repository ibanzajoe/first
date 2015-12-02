var mongoose = require('mongoose'),
    express = require('express'),
    Movie = require('./schemas/movie'),
    bodyParser = require('body-parser');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {

});

var app = express();
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));


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

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('example app listening at http://%s:%s', host, port);
});


mongoose.connect('mongodb://localhost/test');

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
app.get('/delete/:id')

app.get('/test')
app.get('/delete')

//app.post('/insert', function(req, res){
//    req.
//    var nMovie = new Movie({
//        title: mTitle,
//        rating: mRating,
//        releaseYear: mYear,
//        hasCreditCookie: true
//    });
//    nMovie.save(function(err, movie){
//        if(err) return console.error(err);
//        console.dir(movie);
//    });
//});

app.get('/search',
    function(req, res){
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

app.get('/movie', function (req, res){
        res.render('movie',
    {
        title: 'hello world'
    });
});

// Find all movies that have a credit cookie.
Movie.find({ hasCreditCookie: true }, function(err, movies) {   //this is using the "find all" method but specificying the "creditCookie" value to only return "true"
    if (err) return console.error(err);
    console.dir(movies);
});
