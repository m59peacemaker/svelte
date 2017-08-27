'use strict';

var fs = require('fs');
var path = require('path');
var index_ts = require('../compiler/svelte.js');

function capitalise(name) {
	return name[0].toUpperCase() + name.slice(1);
}

require.extensions['.html'] = function(module, filename) {
	var ref = index_ts.compile(fs.readFileSync(filename, 'utf-8'), {
		filename,
		name: capitalise(path.basename(filename).replace(/\.html$/, '')),
		generate: 'ssr'
	});
	var code = ref.code;

	return module._compile(code, filename);
};
//# sourceMappingURL=register.js.map
