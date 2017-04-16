const addons = require('./Build/Release/addons');
const tb = addons.tagbuildr;


class NodeDOM {
	constructor(title, content = '') {
		if (!title) {
			this.error('title is required for every document');
		}

		this.head = tb('head', [
			tb('title', title),
			tb('meta|charset=utf-8')
		]);
		this.body = tb('body', content);
		this.document = '<!DOCTYPE html>' + tb('html', [
			this.head,
			this.body
		]);
	}

	error(message, type = 'default') {

		let ErrorType;

		switch(type) {
			case 'type':
				ErrorType = TypeError;
				break;
			case 'syntax':
				ErrorType = SyntaxError;
				break;
			default:
				ErrorType = Error;
		}

		throw new ErrorType(`[NodeDOM] Error: ${message}`);
		return void 0;
	}

	appendTo(tag, addition) {
		tag = tag.replace(/<.*>(.[^<\/]*)<\/.*>/, function(match, content) {
			const newContent = content + addition;

			return match.replace(content, newContent);
		});
	}

}

module.exports = {
	tb,
	NodeDOM
};