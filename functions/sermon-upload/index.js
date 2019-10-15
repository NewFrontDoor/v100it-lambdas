import createPresignedPost from '../../lib/create-presigned-post';
import sendPresignedPost from './send-presigned-post';

export default async function(data, context, callback) {
	const {name, bucket} = data;
	const [error, response] = await sendPresignedPost(createPresignedPost, {
		bucket,
		name
	});

	callback(error, response);
}
