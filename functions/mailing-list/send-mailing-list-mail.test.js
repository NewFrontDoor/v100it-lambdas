import test from 'ava';
import sendMailingListMail from './send-mailing-list-mail';

const data = {
	name: 'name',
	email: 'email'
};

test('sends email', async t => {
	const transport = {
		sendMail(mail) {
			t.deepEqual(mail, {
				from: 'mailinglist@vision100it.org',
				replyTo: 'email',
				subject: 'Mailing list email',
				text: `Name: name
Email: email`,
				to: 'mailinglist@vision100it.org'
			});
		}
	};
	const [err] = await sendMailingListMail(transport, 'email', data);
	t.falsy(err);
});

test('resolves error', async t => {
	const transport = {
		sendMail() {
			throw new Error('can not send mail');
		}
	};
	const [err] = await sendMailingListMail(transport, 'email', data);
	t.truthy(err);
});
