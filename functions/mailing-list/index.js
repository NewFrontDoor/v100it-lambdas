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
		from: 'mailinglist@vision100it.org',
		to: 'mailinglist@vision100it.org',
		subject: 'Mailing list ' + event.email,
		text: [
			'Name: ' + event.name,
			'Email: ' + event.email
		].join('\n')
	}, context.done);
}
