const fetch = require("node-fetch").default
const { URLSearchParams } = require('url');
require('dotenv').config()

let oAuthToken

export const getRedditApiToken = async () => {
	const TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'
	// if we already have a token just use that one
	if (oAuthToken) {
		console.log('token is already saved')
		return oAuthToken 
	}
	// base64 encode the username and password to send as basic auth type
	const auth = `${ process.env.CLIENT_ID }:${ process.env.CLIENT_SECRET }`
	// construct the form data
	const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');
	params.append('device_id', process.env.DEVICE_ID);

	const options = {
		method: 'POST',
		headers: {
			'User-Agent': 'web:keeb-mart:1.0.0 (by /u/jeremypsu15)',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`,
		},
		body: params
	}

	return fetch(TOKEN_URL, options)
	.then(res => {
		return res.json()
	})
	.then(json => {
		oAuthToken = json.access_token
		return oAuthToken
	})
	.catch(error => console.error('Error:', error))
}

const fetchRedditAPI = async (event, token) => {
	// now request some data form the Reddit API with the token
	// const URL = 'https://oauth.reddit.com/api/v1/user/jeremypsu15/trophies'
	const nextPage = event.queryStringParameters.after || event.queryStringParameters.before
	const URL = `https://oauth.reddit.com/r/mechmarket/search?q="/^\[.*$/g"&restrict_sr=true&sort=new&count=5&limit=5&after=${nextPage}`
	// TODO - don't hardcode this URL, get it from the user
	const options = {
		method: 'GET',
		headers: {
			'Authorization': `bearer ${token}`,
			'User-Agent': 'web:keeb-mart:1.0.0 (by /u/jeremypsu15)'
		}
	}
	return fetch(URL, options)
	.then(res => {
		return res.json()
	})
	.then(json => json)
	.catch(error => console.log('Error fetching data from Reddit: ', error))
}

export async function handler(event, context) {
	const token = await getRedditApiToken()
	const data = await fetchRedditAPI(event, token)

	return {
		statusCode: 200,
		body: JSON.stringify({data})
	};
}
