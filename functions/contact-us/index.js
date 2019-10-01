import createTransport from '../../lib/create-ses-transport';
import sendContactUsMail from './send-contact-us-mail';

export default async function(event, context, callback) {
	const {email} = event;
	const body = JSON.parse(event.body);
	const [err, response] = await sendContactUsMail(
		createTransport(),
		email,
		body
	);

	callback(err, response);
}
