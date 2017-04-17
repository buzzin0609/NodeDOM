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
	}

	appendTo(tagMarkup, addition) {
		return tagMarkup.replace(/<.*>(.[^<\/]*)<\/.*>/, function(match, content) {
			const newContent = content + addition;

			return match.replace(content, newContent);
		});
	}

	appendToBody(addition) {
		this.body = this.appendTo(this.body, addition);
		return void 0;
	}

	appendToHead(addition) {
		this.head = this.appendTo(this.head, addition);
		return void 0;
	}
	
	addScript(url, async = false) {
		this.appendToHead(tb(`script|src=${url}${async ? '|async=async' : ''}`));
		return void 0;
	}
	
	addStylesheet(url) {
		this.appendToHead(tb(`link|rel=stylesheet|type=text/css|href=${url}`));
		return void 0;
	}
	

}

module.exports = {
	tb,
	NodeDOM
};