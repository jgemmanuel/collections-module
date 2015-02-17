var mongoose = require('mongoose');

function connect(connectionString) {
    mongoose.connect(connectionString);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error!'));
    db.once('open', function callback() {
	console.log('Mongoose connected at: ', connectionString);
    });
}

module.exports = connect;
