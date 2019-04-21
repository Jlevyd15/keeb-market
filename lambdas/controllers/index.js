//index controller
// const express = require('express')
// const app = express()
// const nodemailer = require('nodemailer')
const request = require('request')
require('dotenv').config()

const ApiResponse = require('../helper/ApiResponse')

// const Scraper = require('../helper/Scraper')
// let contactFormSubmitReady = false

// const isProd = process.env.NODE_ENV === 'production'

let oAuthToken

const getRedditApiToken = callback => {
	// if we already have a token just use that one
	if (oAuthToken) {
		console.log('token is ready')
		return callback({ error: undefined, data: oAuthToken })
	}

	const options = {
		method: 'POST',
		url: 'https://www.reddit.com/api/v1/access_token',
		'headers': {
			'User-Agent': 'web:keeb-mart:1.0.0 (by /u/jeremypsu15)',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		auth: {
			user: process.env.CLIENT_ID,
			pass: process.env.CLIENT_SECRET,
			sendImmediately: false
		},
		form: {
			grant_type: 'client_credentials',
			device_id: process.env.DEVICE_ID
		}
	}

	request(options, function (error, response, body) {
		body = JSON.parse(body)
		// console.log('body with token is ', body)
		if (!body.access_token) return callback({ error, data: undefined })
		console.log('token is', oAuthToken)
		oAuthToken = body.access_token
		return callback({ error, data: body.access_token })
	})
}

exports.getRedditData = (req, res) => {
	const resultWithToken = ({ data, error }) => {
		// now request some data form the Reddit API with the token

		// TODO - don't hardcode this URL, get it from the user
		const options = {
			method: 'GET',
			url: 'https://oauth.reddit.com/api/v1/user/jeremypsu15/trophies',
			'headers': {
				'Authorization': `bearer ${data}`,
				'User-Agent': 'web:keeb-mart:1.0.0 (by /u/jeremypsu15)'
			}
		}
		console.log('requesting reddit data token is', data)

		request(options, function (error, response, body) {
			body = JSON.parse(body)
			if (error) return res.send(500)
			res.json({ error: undefined, data: body })
		})
	}
	getRedditApiToken(resultWithToken)
}

// since the public directory set as "public" in index, do we still need this route?
//get the index page when user navigates to '/' route
exports.getIndex = (req, res, next) => {
	res.sendFile('index.html', err => {
		if (err) {
			console.error('error ', err)
			next(err)
		}
	})
}

//Handle 404 - not found
exports.notFound = function (req, res) {
	res.status(404)
	res.json(ApiResponse.buildRes({ error: 'Not Found', code: 404 }))
}
