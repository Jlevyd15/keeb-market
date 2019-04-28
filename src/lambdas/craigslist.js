const craigslist = require('node-craigslist');

export async function handler(event, context) {
	let client = new craigslist.Client({
		baseHost: 'craigslist.ca',
		city: event.queryStringParameters.city || 'sfbay'
	});

	const options = {
		category: 'ela',

	}

	let result
	await client
		.search(options, 'mechanical keyboard')
		.then(listings => {
			result = listings
		}).catch(err => {
			console.error('Error: ', err)
		})
	return ({
		statusCode: 200,
		body: JSON.stringify({ data: result })
	})
}