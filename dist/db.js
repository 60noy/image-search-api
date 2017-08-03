'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongodb = require('mongodb');

exports.default = function (callback) {
	_mongodb.MongoClient.connect('mongodb://admin:admin@ds129043.mlab.com:29043/devdb', function (err, db) {
		if (err) return console.log(err);
		callback(db);
	});
};
//# sourceMappingURL=db.js.map