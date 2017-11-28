var mongoose = require('mongoose');
var uri = 'mongodb://test:test@ds123084.mlab.com:23084/mongo_test';
mongoose.Promise = global.Promise;
/*mongoose.connect(
	uri,{
		keepAlive: true,
	  reconnectTries: Number.MAX_VALUE,
	  useMongoClient: true
	}
  );*/


mongoose.connection.openUri(uri)
  .once('open', () => console.log('Good to go !'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });