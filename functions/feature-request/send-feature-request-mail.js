import sendMail from '../../lib/send-mail';

export default function(transporter, email, body) {
	return sendMail(transporter, {
		from: 'jonno@vision100it.org',
		to: 'x+84417606348384@mail.asana.com',
		subject: 'Feature request from ' + body.email,
		text: [
			'Name: ' + body.name,
			'Organisation: ' + body.organisation,
			'Email: ' + body.email,
			'Url: ' + body.url,
			'Request Type: ' + body.requestType,
			'Description: ' + body.description
		].join('\n')
	});
}
