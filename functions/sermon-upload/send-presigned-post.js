import mime from 'mime';
import cryptoRandomString from 'crypto-random-string';

const cors = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': false
};

export default async function(createPresignedPost, {bucket, name}) {
	const contentType = mime.getType(name);
	const key = `${cryptoRandomString({length: 16, type: 'url-safe'})}_${name}`;

	const params = {
		Expires: 60,
		Bucket: bucket,
		Conditions: [['content-length-range', 100, 100000000]],
		Fields: {
			'Content-Type': contentType,
			key
		}
	};

	try {
		const presignedPostData = await createPresignedPost(params);

		const response = {
			statusCode: 200,
			headers: cors,
			body: JSON.stringify({
				error: false,
				data: presignedPostData,
				message: null
			})
		};

		return [null, response];
	} catch (error) {
		return [error];
	}
}
