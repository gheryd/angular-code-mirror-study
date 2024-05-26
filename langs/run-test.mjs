import { exec } from 'child_process';
import path from 'path';

// Ottieni gli argomenti dalla riga di comando dopo --
const args = process.argv.slice(2);

if (args.length > 0) {
	const arg1 = args[0];
	const testFilePath = path.resolve(`./langs/${arg1}/test/test.mjs`);

	const command = `mocha ${testFilePath}`;

	console.log("\n[run-test.mjs] command:", command);


	exec(
		command,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`\n[run-test.mjs] error.message:`, error.message);
				return;
			}
			if (stderr) {
				console.error(`\n[run-test.mjs] stderr:`, stderr);
				return;
			}
			console.log(`\n[run-test.mjs] stdout:`, stdout);
		}
	);
} else {
	console.log('[run-test.mjs] No arguments');
}
