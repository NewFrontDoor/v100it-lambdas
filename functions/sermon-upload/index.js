import {
	southEast2PresignedPost,
	usWest1PresignedPost,
	usWest2PresignedPost,
	usEast1PresignedPost,
	usEast2PresignedPost
} from '../../lib/create-presigned-post';
import sendPresignedPost from './send-presigned-post';

const regionFunctions = {
	apSoutheast2: southEast2PresignedPost,
	usWest1: usWest1PresignedPost,
	usWest2: usWest2PresignedPost,
	usEast1: usEast1PresignedPost,
	usEast2: usEast2PresignedPost
};

export default async function(event, context, callback) {
	const {name, bucket, region = 'apSoutheast2'} = JSON.parse(event.body);
	const [error, response] = await sendPresignedPost(regionFunctions[region], {
		bucket,
		name
	});

	callback(error, response);
}
