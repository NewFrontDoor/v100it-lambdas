import S3 from 'aws-sdk/clients/s3';
const southEast2 = new S3({region: 'ap-southeast-2'});
const usWest1 = new S3({region: 'us-west-1'});
const usWest2 = new S3({region: 'us-west-2'});
const usEast1 = new S3({region: 'us-east-1'});
const usEast2 = new S3({region: 'us-east-2'});

const southEast2PresignedPost = params => {
	return new Promise((resolve, reject) => {
		southEast2.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};

const usWest1PresignedPost = params => {
	return new Promise((resolve, reject) => {
		usWest1.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};

const usWest2PresignedPost = params => {
	return new Promise((resolve, reject) => {
		usWest2.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};

const usEast1PresignedPost = params => {
	return new Promise((resolve, reject) => {
		usEast1.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};

const usEast2PresignedPost = params => {
	return new Promise((resolve, reject) => {
		usEast2.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
};

export {
	southEast2PresignedPost,
	usWest1PresignedPost,
	usWest2PresignedPost,
	usEast1PresignedPost,
	usEast2PresignedPost
};
