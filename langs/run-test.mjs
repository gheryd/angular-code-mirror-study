import { exec } from 'child_process';
import path from 'path';

// Ottieni gli argomenti dalla riga di comando dopo --
const args = process.argv.slice(2);

if (args.length > 0) {
  const arg1 = args[0];
  const testFilePath = path.resolve(`./langs/${arg1}/test/test.mjs`);
  const command = `mocha ${testFilePath}`;

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
