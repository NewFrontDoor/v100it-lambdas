import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';

export default function (event, context, callback) {
	console.log('incoming: ', event);

	const body = JSON.parse(event.body);

	const transporter = nodemailer.createTransport(sesTransport({
		ses: new AWS.SES()
	}));

	transporter.sendMail({
		replyTo: event.email,
		from: 'contactus@newfrontdoor.org',
		to: 'contactus@newfrontdoor.org',
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
