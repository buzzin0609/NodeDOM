const addons = require('./Build/Release/addons');
const tb = addons.tagbuildr;


class NodeDOM {
	constructor(title, content = '') {
		if (!title) {
			this.error('title is required for every document');
		}

		this.head = tb('head', [
			tb('title', title),
			tb('meta|charset=utf-8'),
			tb('meta|name=viewport|content=width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0')
		]);
		this.body = tb('body', content);
	}

	get document() {
		return '<!DOCTYPE html>' + tb('html', [
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
		return tagMarkup.replace(/^<.*?>(.*)<\/.*>/, function(match, content) {
			let newContent = content + addition;
			return match.replace(content, newContent);
		});
	}

	appendToBody(addition) {
		this.body = this.appendTo(this.body, addition);
		return void 0;
	}

	appendToHead(addition) {
		const replacement = this.appendTo(this.head, addition);
		this.head = replacement;
		return void 0;
	}
	
	addScript(url, async = false) {
		const script = tb(`script|src=${url}${async ? '|async=async' : ''}`);
		this.appendToHead(script);
		return void 0;
	}
	
	addStylesheet(url) {
		const link = tb(`link|rel=stylesheet|type=text/css|href=${url}`);
		this.appendToHead(link);
		return void 0;
	}

}

module.exports = {
	tb,
	NodeDOM
};