import getBibleReference from './get-bible-reference';

export default async function(event, context, callback) {
	const {passage} = event.queryStringParameters || {};
	const [err, reference] = await getBibleReference(passage);
	callback(err, {
		statusCode: 200,
		body: JSON.stringify(reference),
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	});
}
