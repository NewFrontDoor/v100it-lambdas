import createPresignedPost from '../../lib/create-presigned-post';
import sendPresignedPost from './send-presigned-post';

export default async function(event, context, callback) {
	const {name, bucket} = JSON.parse(event.body);
	const [error, response] = await sendPresignedPost(createPresignedPost, {
		bucket,
		name
	});

	callback(error, response);
}
