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
		subject: 'Documentation feedback from ' + event.email,
		text: [
			'Email: ' + event.email,
			'Message: ' + event.message
		].join('\n')
	}, context.done);
}
