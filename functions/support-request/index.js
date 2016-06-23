var asana = require('asana');
var cryptex = require('cryptex');

cryptex.use({
	config: {
		keySource: 'kms',
		keySourceOpts: {
			dataKey: 'kms+encrypted+base64+string=='
		}
	}
});

var workspace = '';

function sendRequest(details) {
	var notes = [
		'Name: ' + details.name,
		'Organisation: ' + details.organisation,
		'Email: ' + details.email,
		'Url: ' + details.url,
		'Type: ' + details.type,
		'Severity: ' + details.severity,
		'Summary: ' + details.summary,
		'Details: ' + details.details,
		'File Url: ' + details.fileUrl,
		'Screenshot Url: ' + details.screenshotUrl,
		'Additional details: ' + details.additional
	].join('\n');

	return cryptex.getSecret('asanaToken').then(function (token) {
		return asana.Client.create().useAccessToken(token).tasks.create({
			workspace: workspace,
			notes: notes,
			assignee: '',
			name: 'Support request from ' + details.email
		});
	});
}

exports.handle = function (event, context) {
	console.log('incoming: ', event);

	var requestDetails = {
		summary: event.summary,
		details: event.details,
		url: event.url,
		type: event.type,
		severity: event.severity,
		fileUrl: event.fileUrl,
		screenshotUrl: event.screenshotUrl,
		additional: event.additional,
		name: event.name,
		organisation: event.organisation,
		email: event.email
	};

	sendRequest(requestDetails, context)
		.catch(function (err) {
			console.log('errors: ', err.value.errors);
		});
};
