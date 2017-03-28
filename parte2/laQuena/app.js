var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

var database = require('./config/database');
var morgan = require('morgan');
    mongoose.Promise = require('bluebird');


var port = process.env.PORT || 5000;
// Connection to DB
//mongoose.connect('mongodb://localhost/laquena', function(err, res) {
mongoose.connect(database.url, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});



// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

require('./routes/index.js')(app);

// Start server
app.listen(port, function() {
  console.log("Node server running on http://localhost:"+port);
});
