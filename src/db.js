import { MongoClient } from 'mongodb';

export default callback => {
	MongoClient.connect('mongodb://admin:admin@ds129043.mlab.com:29043/devdb', (err,db) => {
		if (err) return console.log(err)
		callback(db);
	})
}
