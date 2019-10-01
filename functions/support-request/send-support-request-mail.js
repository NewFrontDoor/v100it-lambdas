import sendMail from '../../lib/send-mail';

export default function(transporter, email, body) {
	return sendMail(transporter, {
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
	});
}
