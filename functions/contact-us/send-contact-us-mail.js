import sendMail from '../../lib/send-mail';

export default function(transporter, email, body) {
	return sendMail(transporter, {
		replyTo: email,
		from: 'contactus@newfrontdoor.org',
		to: 'contactus@newfrontdoor.org',
		subject: 'New client request from ' + body.email,
		text: [
			'Name: ' + body.name,
			'Organisation: ' + body.organisation,
			'Email: ' + body.email,
			'Message: ' + body.message
		].join('\n')
	});
}
