import { Router } from 'express';
import facets from './facets';
import moment from 'moment';
import search from './search'
import {API_KEY} from '../lib/constants';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// api.use('/search', search({db,api}));
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html')
	});

	api.get('/search', (req, res) => {
		db.collection('searches').find().toArray((err,results) => {
			res.json({message: results[0]})
		})
		// res.json({message: db})
	})
	api.post('/search/:imgstr', (req, res) => {
		const search = req.params.imgstr
		const date = moment()
		db.collection('searches').insert({name: search,date}, (err,results) => {
			if (err) {
				res.json('error saving data')
			}
			res.json({results})
		})
		// res.json({message: db})
	})

	return api;
}
