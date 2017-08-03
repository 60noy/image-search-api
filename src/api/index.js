import { Router } from 'express';
import moment from 'moment';
import {searchImageByString} from './image_search';

export default ({ config, db }) => {
	let api = Router();

	// get index page
	api.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html')
	});
	// get all searches
	api.get('/searches', (req, res) => {
		db.collection('searches').find({},{_id: 0}).toArray((err,results) => {
			res.json(results)
		})
		// res.json({message: db})
	})
	// search for another image and add to searches collection
	api.post('/search/:imgstr', (req, res) => {
		const searchQuery = req.params.imgstr
		const offset = req.query.offset
		const date = moment().format('DD-MM-YYYY, HH:MM:SS')
		console.log(date);
		db.collection('searches').insert({name: searchQuery,date}, (err) => {
			if (err) {
				res.json('error saving data')
			}
			searchImageByString(searchQuery)
			.then((resp) => {
				const slicedResponse = offset ? resp.splice(0,offset) : resp
				res.json(slicedResponse)
			})
			.catch((err) => {res.json({err})})
		})
	})

	return api;
}
