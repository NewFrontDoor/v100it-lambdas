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
		from: 'jonno@vision100it.org',
		to: 'x+84417606348384@mail.asana.com',
		subject: 'Support request from ' + body.email,
		text: [
			'Name: ' + body.name,
			'Organisation: ' + body.organisation,
			'Email: ' + body.email,
			'Url: ' + body.url,
			'Request Type: ' + body.requestType,
			'Severity: ' + body.severity,
			'Summary: ' + body.summary,
			'Details: ' + body.details,
			'File Url: ' + body.fileUrl,
			'Screenshot Url: ' + body.screenshotUrl,
			'Additional details: ' + body.additional
		].join('\n')
	}, err => callback(err, {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		body: ''
	}));
}
