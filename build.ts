/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import childProcess from 'child_process';

(async () => {
	try {
		// Remove current build
		await remove('./dist/');
		// Copy back-end files
		await exec('tsc --build tsconfig.prod.json', './');
	} catch (err) {
		console.error(err);
	}
})();

function remove(loc: string): Promise<void> {
	return new Promise((res, rej) => {
		return fs.remove(loc, err => {
			return !!err ? rej(err) : res();
		});
	});
}

function exec(cmd: string, loc: string): Promise<void> {
	return new Promise((res, rej) => {
		return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
			if (!!stdout) {
				console.info(stdout);
			}
			if (!!stderr) {
				console.error(stderr);
			}
			return !!err ? rej(err) : res();
		});
	});
}
