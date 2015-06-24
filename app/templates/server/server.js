// promisify first
var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

// create app
var express = require('express');
var app = express();

var path = require('path');
var logger = require('../util/logger');

// routers
app.use('/service', require('./routers/index'));
app.use(express.static(path.join(__dirname, '../assets')));
app.use(require('./routers/other'));

// handle error
app.use(function(err, req, res, next) {
  logger.error(err.message);
  res.status(500).json({msg: err.message});
});

var config = require('../config');
// connect to db async
var port = process.env.PORT || config.port || 4000;
var connected = false;

// set db connectiion config, timeout 5s
var dbConfig = {
    server: {
        socketOptions: { connectTimeoutMS: 5000 }
    }
};

mongoose.connect(config.db.connection, dbConfig);

mongoose.connection.on("connected", function() {
    logger.info("Connected to DB...");
    connected = true;
});

mongoose.connection.on("disconnected", function() {

    // after a successful connecting,
    // mongoose will reconnect automatically if connection disconnected.
    if(!connected) {
        logger.warning("DBConnection closed. Try to reconnect.");

        setTimeout(function() {
            mongoose.connection.open(config.dbConnection, dbConfig);
        }, 5000);
    }
});

mongoose.connection.on("error", function(err) {
    logger.error("Error occurred: " + err.message);
});

app.listen(port, function() {
    logger.info("Server listening on port " + port);
});
