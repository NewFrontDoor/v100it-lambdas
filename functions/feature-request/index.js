import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';

export default function (event, context) {
	console.log('incoming: ', event);

	var transporter = nodemailer.createTransport(sesTransport({
		ses: new AWS.SES()
	}));

	transporter.sendMail({
		from: 'jonno@vision100it.org',
		to: 'x+84417606348384@mail.asana.com',
		subject: 'Feature request from ' + event.email,
		text: [
			'Name: ' + event.name,
			'organisation: ' + event.organisation,
			'Email: ' + event.email,
			'Url: ' + event.url,
			'Request Type: ' + event.requestType,
			'Description: ' + event.description
		].join('\n')
	}, context.done);
}
