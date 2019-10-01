import sendMail from '../../lib/send-mail';

export default function(transporter, email, body) {
	return sendMail(transporter, {
		replyTo: body.email,
		from: 'mailinglist@vision100it.org',
		to: 'mailinglist@vision100it.org',
		subject: 'Mailing list ' + body.email,
		text: ['Name: ' + body.name, 'Email: ' + body.email].join('\n')
	});
}
