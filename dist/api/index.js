'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _image_search = require('./image_search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// get index page
	api.get('/', function (req, res) {
		res.sendFile(__dirname + '/index.html');
	});
	// get all searches
	api.get('/searches', function (req, res) {
		db.collection('searches').find({}, { _id: 0 }).toArray(function (err, results) {
			res.json(results);
		});
		// res.json({message: db})
	});
	// search for another image and add to searches collection
	api.post('/search/:imgstr', function (req, res) {
		var searchQuery = req.params.imgstr;
		var offset = req.query.offset;
		var date = (0, _moment2.default)().format('DD-MM-YYYY, HH:MM:SS');
		console.log(date);
		db.collection('searches').insert({ name: searchQuery, date: date }, function (err) {
			if (err) {
				res.json('error saving data');
			}
			(0, _image_search.searchImageByString)(searchQuery).then(function (resp) {
				var slicedResponse = offset ? resp.splice(0, offset) : resp;
				res.json(slicedResponse);
			}).catch(function (err) {
				res.json({ err: err });
			});
		});
	});

	return api;
};
//# sourceMappingURL=index.js.map