//index controller
// const express = require('express')
// const app = express()
// const nodemailer = require('nodemailer')
// const request = require('request')
const path = require('path')

const ApiResponse = require('../helper/ApiResponse')

// const Scraper = require('../helper/Scraper')
// let contactFormSubmitReady = false

// const isProd = process.env.NODE_ENV === 'production'

//get the index page when user navigates to '/' route
exports.getIndex = (req, res, next) => {
	// console.log('serving response', res)
	var options = {
		root: path.resolve(__dirname, '../public/'),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}

	res.sendFile('index.html', options, err => {
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
