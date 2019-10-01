import createTransport from '../../lib/create-ses-transport';
import sendMailingListMail from './send-mailing-list-mail';

export default async function(event, context, callback) {
	const {email} = event;
	const body = JSON.parse(event.body);
	const [err, response] = await sendMailingListMail(
		createTransport(),
		email,
		body
	);

	callback(err, response);
}
