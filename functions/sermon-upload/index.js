import uniqid from 'uniqid';
import mime from 'mime';
import createPresignedPost from './create-presigned-post';

const cors = {
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
			headers: cors,
			body: JSON.stringify({
				error: true,
				data: null,
				message: error.message
			})
		},
		{
			statusCode: 200,
			headers: cors,
			body: JSON.stringify({
				error: false,
				data: presignedPostData,
				message: null
			})
		}
	);
}
