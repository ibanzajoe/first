var mongoose = require('mongoose');

var siteSchema = new mongoose.Schema({  //this is setting up the schema of the object and the "keys" involved
    url: {type: String, unique: true},                 //title is a key of the record/document with string datatype
    title: String,                         //rating is a key on the document with string data type
    description: String                    //releaseYear is a key on the document with number data type
});

var Sites = mongoose.model('Sites', siteSchema);  //set var "Sites" mongoose.model method that create model from the schema above titled "Sites"

module.exports = Sites;