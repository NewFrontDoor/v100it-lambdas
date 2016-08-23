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
		subject: 'Support request from ' + event.email,
		text: [
			'Name: ' + event.name,
			'Organisation: ' + event.organisation,
			'Email: ' + event.email,
			'Url: ' + event.url,
			'Type: ' + event.type,
			'Severity: ' + event.severity,
			'Summary: ' + event.summary,
			'Details: ' + event.details,
			'File Url: ' + event.fileUrl,
			'Screenshot Url: ' + event.screenshotUrl,
			'Additional details: ' + event.additional
		].join('\n')
	}, context.done);
}
