import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const child = fork(__dirname + '/child.mjs', {
  execArgv: ['--max-old-space-size=8000']
});
child.on('message', (message) => {
  console.log('Message from child:', message);
  // child.kill('SIGTERM');
});
child.on('exit', (code) => {
  console.log('Child exited', code);
});
child.on('error', (err) => {
  console.log('Child error', err);
});
child.send({});