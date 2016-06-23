var asana = require('asana');

var workspace = '';

var client = asana.Client.create().useAccessToken('');

function sendRequest(details, context) {
	var notes = [
		'Name: ' + details.name,
		'organisation: ' + details.organisation,
		'Email: ' + details.email,
		'Url: ' + details.url,
		'Type: ' + details.type,
		'Description: ' + details.description
	].join('\n');

	return client.tasks.create({
		workspace: workspace,
		notes: notes,
		assignee: '',
		name: 'Feature request from ' + details.email
	});
}

exports.handle = function (event, context) {
	console.log('incoming: ', event);

	var requestDetails = {
		name: event.name,
		organisation: event.organisation,
		email: event.email,
		url: event.url,
		type: event.type,
		file: event.file,
		screenshot: event.screenshot,
		description: event.description
	};

	sendRequest(requestDetails, context)
		.catch(function (err) {
			console.log(err.value.errors);
		});
};
