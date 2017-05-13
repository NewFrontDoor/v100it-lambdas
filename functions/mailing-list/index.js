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
		replyTo: body.email,
		from: 'mailinglist@vision100it.org',
		to: 'mailinglist@vision100it.org',
		subject: 'Mailing list ' + body.email,
		text: [
			'Name: ' + body.name,
			'Email: ' + body.email
		].join('\n')
	}, err => callback(err, {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		body: ''
	}));
}
