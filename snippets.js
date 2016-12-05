var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

moongoose.connection.on('error', err => {
  console.error('Could not connect. Error: ', err);
});

mongoose.connection.once('open', )
