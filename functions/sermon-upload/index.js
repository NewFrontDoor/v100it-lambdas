import createPresignedPost from './create-presigned-post';
const uniqid = require('uniqid');
const mime = require('mime');

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': false
};

export default async function(data, context, callback) {
	const {name, bucket} = data;
	const [error, presignedPostData] = await createPresignedPost({
		key: `${uniqid()}_${name}`,
		bucket,
		contentType: mime.getType(name)
	});

	callback(
		{
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: true,
				data: null,
				message: error.message
			})
		},
		{
			statusCode: 200,
			headers,
			body: JSON.stringify({
				error: false,
				data: presignedPostData,
				message: null
			})
		}
	);
}
