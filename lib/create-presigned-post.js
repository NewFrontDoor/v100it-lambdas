import S3 from 'aws-sdk/clients/s3';
const s3 = new S3();

export default function(params) {
	return new Promise((resolve, reject) => {
		s3.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
}
