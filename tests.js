const addons = require('./Build/Release/addons');
const assert = require('assert');
const { NodeDOM } = require('./nodeDOM');
const { testr, suite } = require('node-testr');

const { tagbuildr } = addons;

suite('testing tagbuildr interface', function() {

	testr('instantiating empty tagbuildr function throws a no arguments error', function() {
		assert.throws(tagbuildr, err => {
			return (err instanceof Error) && /no arguments supplied/.test(err);
		});
	});

	testr('passing non string as first argument throws TypeError', function() {
		assert.throws(tagbuildr.bind(null, 1), err => {
			return (err instanceof TypeError) && /must be a tag string/.test(err);
		});
	});

	testr('returns a string', function() {
		const test = tagbuildr('img');

		assert.ok(test);
		assert(/img/.test(test));
		assert.equal('<img />', test);

	});

	testr('adds classes and id', function() {
		const test = tagbuildr('h2.my-class.my-class-2#my-id');

		assert(/class/.test(test));
		assert(/id/.test(test));

		assert(/my-class/.test(test));
		assert(/my-id/.test(test));

		assert.equal('<h2 id="my-id" class="my-class my-class-2"></h2>', test);
	});

	testr('attributes are added to the element', function() {
		const test = tagbuildr('img|src=myimg.jpg|alt=cool img');

		assert.ok(test);
		assert(/src/.test(test));
		assert(/alt/.test(test));
		assert.equal('<img src="myimg.jpg" alt="cool img" />', test);

	});

	testr('adds classes, ids, and attributes together', function() {
		const test = tagbuildr('h2.title#main-title|data-foo=bar');

		assert.ok(test);
		assert(/class/.test(test));
		assert(/id/.test(test));
		assert(/data-foo/.test(test));

		assert.equal('<h2 id="main-title" class="title" data-foo="bar"></h2>', test);
	});

	testr('adds string child', function() {
		const test = tagbuildr('h2', 'hey');

		assert.ok(test);
		assert(/hey/.test(test));
		assert.equal('<h2>hey</h2>', test);
	});

	testr('adds number child', function() {
		const test = tagbuildr('p', 5);

		assert.ok(test);
		assert.equal('<p>5</p>', test);
	});

	testr('adds another tagbuildr as child', function() {
		const test = tagbuildr('h2', tagbuildr('span', 'foo'));

		assert.ok(test);
		assert(/span/.test(test));
		assert('<h2><span>foo</span></h2>', test);
	});

	testr('adds array of string children', function() {
		const test = tagbuildr('h1', [
			'foo', 'bar'
		]);

		assert.ok(test);
		assert(/foo/.test(test));
		assert(/bar/.test(test));
		assert.equal('<h1>foobar</h1>', test);

	});

	testr('adds a mixed array of string, numbers and tagbuildr strings', function() {
		const test = tagbuildr('div', [
			tagbuildr('h1.title', 'Shiny title'),
			tagbuildr('img.featured-img|src=my-img.jpg'),
			'Article written by: ',
			tagbuildr('h2.author', 'Will Busby'),
			'Article Date: ', 2000
		]);

		assert.ok(test);
		assert(/h1/.test(test));
		assert(/img/.test(test));
		assert(/h2/.test(test));
		assert(/2000/.test(test));

		assert(test.includes(0, '<h1 class="title">Shiny Title</h1>'));
		assert(test.includes(0, '<img class="featured-img" src="my-img.jpg" />'));
		assert(test.includes(0, 'Article written by: <h2 class="author">Will Busby</h2>'));
		assert(test.includes(0, 'Article Date: 2000'));

	});


});

suite('testing NodeDOM class', function() {
	testr('exists', function() {
		assert.ok(NodeDOM);
	});
	
	testr('class initialises', function() {
		const nd = new NodeDOM('test', 'test content');

		assert.ok(nd);

		testr('instance renders html, head, and body elements', function() {
			const { document, head, body } = nd;

			assert.ok(document);
			assert(document.includes('<html>'));

			assert.ok(head);
			assert.equal(`<head><title>test</title><meta charset="utf-8" /></head>`, head);

			assert.ok(body);
			assert.equal(`<body>test content</body>`, body);
		});
	});



})

