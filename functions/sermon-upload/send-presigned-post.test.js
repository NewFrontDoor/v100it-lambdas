import test from 'ava';
import sendPresignedPost from './send-presigned-post';

const name = 'some-file-name.png';
const bucket = 'bucket';

test('sends email', async t => {
	function createPresignedPost(params) {
		t.is(params.Bucket, 'bucket');
		t.is(params.Expires, 60);
		t.is(params.Fields['Content-Type'], 'image/png');
		t.regex(params.Fields.key, /.{16}_some-file-name.png/);
		t.deepEqual(params.Conditions, [['content-length-range', 100, 100000000]]);
	}

	const [err] = await sendPresignedPost(createPresignedPost, {name, bucket});
	t.falsy(err);
});

test('resolves error', async t => {
	function createPresignedPost() {
		throw new Error('can not presign');
	}

	const [err] = await sendPresignedPost(createPresignedPost, {name, bucket});
	t.truthy(err);
});
