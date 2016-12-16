

var fs = require('fs')
var path = require('path');

fs.readdir('nnxx', function (e, files) {
	if (e) return;

	let cppout = ['(']
	let hppout = ['(']
	files.forEach((file) => {
		if (path.extname(file) === '.cpp') {
			cppout.push('nnxx/' + file);	
		} else if (path.extname(file) === '.hpp' || path.extname(file) === '.h') {
			hppout.push('nnxx/' + file)	
		}
		
		
	});


	hppout.push(')')
	cppout.push(')')

	let str = hppout.join('\n') + '\n' + cppout.join('\n'); 


	fs.writeFileSync('CMakeLists.txt', str);

});