const S3 = require('aws-sdk/clients/s3');
const uniqid = require('uniqid');
const mime = require('mime');

const headers = {
	'Access-Control-Allow-Origin': 'https://oneway.sanity.studio/dashboard',
	'Access-Control-Allow-Credentials': true
};

const createPresignedPost = ({key, contentType}) => {
	const s3 = new S3();
	const params = {
		Expires: 60,
		Bucket: 'sermons.onewaymargate.org',
		Conditions: [['content-length-range', 100, 100000000]],
		Fields: {
			'Content-Type': contentType,
			key
		}
	};

	return new Promise((resolve, reject) => {
		s3.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(data);
		});
	});
};

export default async function(data) {
	try {
		const {name} = data;
		const presignedPostData = await createPresignedPost({
			key: `${uniqid()}_${name}`,
			contentType: mime.getType(name)
		});

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({
				error: false,
				data: presignedPostData,
				message: null
			})
		};
	} catch (error) {
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: true,
				data: null,
				message: error.message
			})
		};
	}
}
