import createTransport from '../../lib/create-ses-transport';
import sendFeatureRequestMail from './send-feature-request-mail';

export default async function(event, context, callback) {
	const {email} = event;
	const body = JSON.parse(event.body);
	const [err, response] = await sendFeatureRequestMail(
		createTransport(),
		email,
		body
	);

	callback(err, response);
}
