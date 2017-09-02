import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';

export default function (event, context, callback) {
	const body = JSON.parse(event.body);

	const transporter = nodemailer.createTransport(sesTransport({
		ses: new AWS.SES()
	}));

	transporter.sendMail({
		from: 'jonno@vision100it.org',
		to: 'x+84417606348384@mail.asana.com',
		subject: 'Feature request from ' + body.email,
		text: [
			'Name: ' + body.name,
			'organisation: ' + body.organisation,
			'Email: ' + body.email,
			'Url: ' + body.url,
			'Request Type: ' + body.requestType,
			'Description: ' + body.description
		].join('\n')
	}, err => callback(err, {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		body: ''
	}));
}
