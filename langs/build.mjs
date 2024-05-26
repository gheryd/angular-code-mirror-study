import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);

if (args.length > 0) {
	const lang = args[0];
	const modulePath = fileURLToPath(import.meta.url);
	const resolvedPath = path.dirname(modulePath);
	const baseDir = `${resolvedPath}/${lang}`;

	console.log("\n[build.mjs] baseDir:", baseDir);

	const command = `rollup -c ./langs/rollup.config.js --baseDir=langs/${lang}`;

	console.log("\n[build.mjs] command:", command);


	exec(
		command,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`\n\n[build.mjs] error.message: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`\n\n[build.mjs] stderr:`, stderr);
				return;
			}
			console.log(`\n\n[build.mjs] stdout:\n${stdout}`);
		}
	);
} else {
	console.log('[build.mjs] No arguments');
}
