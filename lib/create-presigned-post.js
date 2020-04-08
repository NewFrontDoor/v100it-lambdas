import {promisify} from 'util';
import S3 from 'aws-sdk/clients/s3';
const southEast2 = new S3({region: 'ap-southeast-2'});
const usWest1 = new S3({region: 'us-west-1'});
const usWest2 = new S3({region: 'us-west-2'});
const usEast1 = new S3({region: 'us-east-1'});
const usEast2 = new S3({region: 'us-east-2'});

export const southEast2PresignedPost = promisify(
	southEast2.createPresignedPost.bind(southEast2)
);
export const usWest1PresignedPost = promisify(usWest1.createPresignedPost.bind(usWest1));
export const usWest2PresignedPost = promisify(usWest2.createPresignedPost.bind(usWest2));
export const usEast1PresignedPost = promisify(usEast1.createPresignedPost.bind(usEast1));
export const usEast2PresignedPost = promisify(usEast2.createPresignedPost.bind(usEast2));
