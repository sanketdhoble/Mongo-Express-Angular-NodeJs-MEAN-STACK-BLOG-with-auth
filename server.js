 var express  = require('express');
    var app      = express();                        // create our app w/ express
    var mongoose = require('mongoose');              // mongoose for mongodb
    var crypto = require('crypto'); 
    var morgan   = require('morgan');                // log requests to the console (express4)
    var bodyParser = require('body-parser'); 
    var textSearch = require('mongoose-text-search'); 
    var jwt    = require('jsonwebtoken');       // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    //var database = require('./config/database');
    var port     = process.env.PORT || 8888;         // set the port
    var session = require('express-session');
    app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 20000 }
    }));

    // configuration ===============================================================
    mongoose.connect('mongodb://localhost/todoAppTest');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes ======================================================================
    require('./app/routes.js')(app);

    app.get('/*', function(req, res){
        res.sendfile(__dirname + '/public/index.html');
    });

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);