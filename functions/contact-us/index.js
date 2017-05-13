import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';

export default function (event, context, callback) {
	console.log('incoming: ', event);

	var body = JSON.parse(event.body);

	var transporter = nodemailer.createTransport(sesTransport({
		ses: new AWS.SES()
	}));

	transporter.sendMail({
		replyTo: event.email,
		from: 'contactus@vision100it.org',
		to: 'contactus@vision100it.org',
		subject: 'New client request from ' + body.email,
		text: [
			'Name: ' + body.name,
			'Organisation: ' + body.organisation,
			'Email: ' + body.email,
			'Message: ' + body.message
		].join('\n')
	}, err => callback(err, {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		body: ''
	}));
}
