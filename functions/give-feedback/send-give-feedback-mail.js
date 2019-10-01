import sendMail from '../../lib/send-mail';

export default function(transporter, email, body) {
	return sendMail(transporter, {
		from: 'jonno@vision100it.org',
		to: 'x+84417606348384@mail.asana.com',
		subject: 'Documentation feedback from ' + body.email,
		text: [
			'Email: ' + body.email,
			'Message: ' + body.message,
			'Document Url: ' + body.url
		].join('\n')
	});
}
