var AWS = require('aws-sdk');
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');

exports.handle = function (event, context) {
	console.log('incoming: ', event);

	var ses = new AWS.SES();
	var transport = nodemailer.createTransport(sesTransport({
		ses: ses
	}));

	transporter.sendMail({
		from: 'supportrequest@vision100it.org',
		to: 'x@mail.asana.com',
		subject: 'Support request from ' + event.email
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
};
