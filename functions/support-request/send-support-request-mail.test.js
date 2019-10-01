import test from 'ava';
import sendSupportRequestMail from './send-support-request-mail';

const data = {
	name: 'name',
	organisation: 'organisation',
	email: 'email',
	url: 'url',
	requestType: 'requestType',
	severity: 'severity',
	summary: 'summary',
	details: 'details',
	fileUrl: 'fileUrl',
	screenshotUrl: 'screenshotUrl',
	additional: 'additional'
};

test('sends email', async t => {
	const transport = {
		sendMail(mail) {
			t.deepEqual(mail, {
				from: 'jonno@vision100it.org',
				subject: 'Support request from email',
				text: `Name: name
Organisation: organisation
Email: email
Url: url
Request Type: requestType
Severity: severity
Summary: summary
Details: details
File Url: fileUrl
Screenshot Url: screenshotUrl
Additional details: additional`,
				to: 'x+84417606348384@mail.asana.com'
			});
		}
	};
	const [err] = await sendSupportRequestMail(transport, 'email', data);
	t.falsy(err);
});

test('resolves error', async t => {
	const transport = {
		sendMail() {
			throw new Error('can not send mail');
		}
	};
	const [err] = await sendSupportRequestMail(transport, 'email', data);
	t.truthy(err);
});
