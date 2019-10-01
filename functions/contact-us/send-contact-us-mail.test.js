import test from 'ava';
import sendContactUsMail from './send-contact-us-mail';

const data = {
	email: 'email',
	name: 'name',
	organisation: 'organisation',
	message: 'message'
};

test('sends email', async t => {
	const transport = {
		sendMail(mail) {
			t.deepEqual(mail, {
				from: 'contactus@newfrontdoor.org',
				replyTo: 'email',
				subject: 'New client request from email',
				text: `Name: name
Organisation: organisation
Email: email
Message: message`,
				to: 'contactus@newfrontdoor.org'
			});
		}
	};
	const [err] = await sendContactUsMail(transport, 'email', data);
	t.falsy(err);
});

test('resolves error', async t => {
	const transport = {
		sendMail() {
			throw new Error('can not send mail');
		}
	};
	const [err] = await sendContactUsMail(transport, 'email', data);
	t.truthy(err);
});
