var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({  //this is setting up the schema of the object and the "keys" involved
    title: {type: String},                 //title is a key of the record/document with string datatype
    rating: String,                         //rating is a key on the document with string data type
    releaseYear: Number,                    //releaseYear is a key on the document with number data type
    hasCreditCookie: Boolean                //hasCreditCookie is a key on the document with a Boolean data type
});

var Movie = mongoose.model('Movie', movieSchema);  //set var "Movie" mongoose.model method that create model from the schema above titled "movie"

module.exports = Movie