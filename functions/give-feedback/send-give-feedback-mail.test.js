import test from 'ava';
import sendGiveFeedbackMail from './send-give-feedback-mail';

const data = {
	email: 'email',
	message: 'message',
	url: 'url'
};

test('sends email', async t => {
	const transport = {
		sendMail(mail) {
			t.deepEqual(mail, {
				from: 'jonno@vision100it.org',
				subject: 'Documentation feedback from email',
				text: `Email: email
Message: message
Document Url: url`,
				to: 'x+84417606348384@mail.asana.com'
			});
		}
	};
	const [err] = await sendGiveFeedbackMail(transport, 'email', data);
	t.falsy(err);
});

test('resolves error', async t => {
	const transport = {
		sendMail() {
			throw new Error('can not send mail');
		}
	};
	const [err] = await sendGiveFeedbackMail(transport, 'email', data);
	t.truthy(err);
});
