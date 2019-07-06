const crypto = require('crypto');
var md5 = (str) => {
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}
let keyarray = {};
let index = 0;
module.exports = function(source) {
	let keys = source.match(/\$_([a-z0-9_]+?)_\$/ig);
	if (keys) {
		keys.map((item) => {
			if (keyarray[item] === void 0) {
				keyarray[item] = {
					regexp:new RegExp(item.replace(/\$/g,'\\$'), 'gm'),
					trueName:`Y${index.toString(16)}_${item.replace(/^\$_(.+)_\$$/gm,'$1')}`
				};
				index ++;
			}
			source = source.replace(keyarray[item].regexp, keyarray[item].trueName);
		});
	}
	return source;
};