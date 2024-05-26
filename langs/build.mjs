import { exec } from 'child_process';
import path, { basename } from 'path';
import { fileURLToPath } from 'url';

// Ottieni gli argomenti dalla riga di comando dopo --
const args = process.argv.slice(2);

if (args.length > 0) {
  const lang = args[0];
  const configPath = path.resolve(`./langs/rollup.config.js`);
  const modulePath = fileURLToPath(import.meta.url);
  const resolvedPath = path.dirname(modulePath);
  const baseDir = `${resolvedPath}/${lang}`;
  console.log("-----> baseDir", baseDir);
  
  const command = `rollup -c ./langs/rollup.config.js --baseDir=langs/${lang}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Errore: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Risultato:\n${stdout}`);
  });
} else {
  console.log('Nessun argomento fornito');
}
