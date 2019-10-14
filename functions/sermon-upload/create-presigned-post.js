const S3 = require('aws-sdk/clients/s3');

export default async function({key, bucket, contentType}) {
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
		const {body} = await presignedPost(params);
		return [body];
	} catch (error) {
		return [error];
	}
}

const presignedPost = params => {
	const s3 = new S3();
	return new Promise((resolve, reject) => {
		s3.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};
