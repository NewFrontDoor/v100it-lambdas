import createTransport from '../../lib/create-ses-transport';
import sendSupportRequestMail from './send-support-request-mail';

export default async function(event, context, callback) {
	const {email} = event;
	const body = JSON.parse(event.body);
	const [err, response] = await sendSupportRequestMail(
		createTransport(),
		email,
		body
	);

	callback(err, response);
}
