import test from 'ava';
import sendFeatureRequestMail from './send-feature-request-mail';

const data = {
	name: 'name',
	organisation: 'organisation',
	email: 'email',
	url: 'url',
	requestType: 'requestType',
	description: 'description'
};

test('sends email', async t => {
	const transport = {
		sendMail(mail) {
			t.deepEqual(mail, {
				from: 'jonno@vision100it.org',
				subject: 'Feature request from email',
				text: `Name: name
Organisation: organisation
Email: email
Url: url
Request Type: requestType
Description: description`,
				to: 'x+84417606348384@mail.asana.com'
			});
		}
	};
	const [err] = await sendFeatureRequestMail(transport, 'email', data);
	t.falsy(err);
});

test('resolves error', async t => {
	const transport = {
		sendMail() {
			throw new Error('can not send mail');
		}
	};
	const [err] = await sendFeatureRequestMail(transport, 'email', data);
	t.truthy(err);
});
