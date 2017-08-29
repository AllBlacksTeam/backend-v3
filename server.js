var express = require('express');
var bookRouter = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/books100416');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to db...');
});


//pre-populate the database
var Book = require('./model/book.js');


Book.find(function(err, data) {
   for(var j=0; j<data.length; j++) {
       data[j].remove();
   }
});

var books = [
    {
        "title": "Napoleon",
        "author": "Max Gallo"
    },
    {
        "title": "Los Kennedy",
        "author": "Collier"
    },
    {
        "title": "El Quijote",
        "author": "Cervantes"
    }
];

for(var i=0; i<books.length; i++) {
    var book = new Book(books[i]);
    book.save();
}


var app = express();

app.use('/api/books', bookRouter);

bookRouter.route('/')
    .get(function(req, res) {
        Book.find(function(err, data) {
            if(err) {
                res.status(500).send(err);
            } else {
                console.log(data.length);
                res.json(data);
            }
        })
    });





app.get('/', function(req, res) {
    res.send("home page");
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('server listening on port ' + port);
});
