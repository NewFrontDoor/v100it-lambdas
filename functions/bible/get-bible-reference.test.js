import test from 'ava';
import getBibleReference from './get-bible-reference';

test('gets a verse', async t => {
	const [err, reference] = await getBibleReference('Genesis 1:1');

	t.falsy(err);
	t.deepEqual(reference, [
		{
			bookname: 'Genesis',
			chapter: '1',
			text: 'In the beginning God created the heavens and the earth.',
			title: 'The Creation of the World',
			titles: ['The Creation of the World'],
			verse: '1'
		}
	]);
});

test('gets a chapter', async t => {
	const [err, reference] = await getBibleReference('Genesis 1');

	t.falsy(err);
	t.is(reference.length, 31);
});

test('resolves errors', async t => {
	const [err] = await getBibleReference('what lol');

	t.truthy(err);
});
