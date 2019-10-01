import createTransport from '../../lib/create-ses-transport';
import sendGiveFeedbackMail from './send-give-feedback-mail';

export default async function(event, context, callback) {
	const {email} = event;
	const body = JSON.parse(event.body);
	const [err, response] = await sendGiveFeedbackMail(
		createTransport(),
		email,
		body
	);

	callback(err, response);
}
