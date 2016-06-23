var AWS = require('aws-sdk');
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');

exports.handle = function (event, context) {
	console.log('incoming: ', event);

	var ses = new AWS.SES();
	var transporter = nodemailer.createTransport(sesTransport({
		ses: ses
	}));

	transporter.sendMail({
		replyTo: event.email,
		from: 'contactus@vision100it.org',
		to: 'contactus@vision100it.org',
		subject: 'Feature request from ' + event.email,
		text: [
			'Name: ' + event.name,
			'Organisation: ' + event.organisation,
			'Email: ' + event.email,
			'Message: ' + event.message
		].join('\n')
	}, context.done);
};
