const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  const backup = path.join(os.tmpdir(), `portfolio-prior-release-${Date.now()}.tar.gz`);
  execFileSync('tar', ['-czf', backup, '-C', root, 'dist']);
  console.log(`Recoverable prior build: ${backup}`);
  fs.rmSync(dist, {recursive:true});
}
