import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';

export default function (event, context) {
	console.log('incoming: ', event);

	var transporter = nodemailer.createTransport(sesTransport({
		ses: new AWS.SES()
	}));

	transporter.sendMail({
		replyTo: event.email,
		from: 'contactus@vision100it.org',
		to: 'contactus@vision100it.org',
		subject: 'New client request from ' + event.email,
		text: [
			'Name: ' + event.name,
			'Organisation: ' + event.organisation,
			'Email: ' + event.email,
			'Message: ' + event.message
		].join('\n')
	}, context.done);
}
