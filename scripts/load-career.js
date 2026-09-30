const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const CANONICAL_DIR = path.join(ROOT, 'resume', 'canonical');
const PROFILES_DIR = path.join(ROOT, 'resume', 'profiles');
const CANONICAL_PARTS = ['identity', 'experience', 'education', 'skills'];

function readYaml(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

function loadCareer(dir = CANONICAL_DIR) {
  const career = {};
  for (const key of CANONICAL_PARTS) {
    const file = path.join(dir, `${key}.yml`);
    if (!fs.existsSync(file)) {
      throw new Error(`Missing canonical file: ${path.relative(ROOT, file)}`);
    }
    const doc = readYaml(file);
    if (!doc || !(key in doc)) {
      throw new Error(`${path.relative(ROOT, file)} must have a top-level "${key}" key`);
    }
    career[key] = doc[key];
  }
  return career;
}

function listProfileIds(dir = PROFILES_DIR) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.yml'))
    .map((name) => name.replace(/\.yml$/, ''))
    .sort();
}

function loadProfile(id, dir = PROFILES_DIR) {
  const file = path.join(dir, `${id}.yml`);
  if (!fs.existsSync(file)) {
    throw new Error(`Profile not found: ${path.relative(ROOT, file)}`);
  }
  return readYaml(file);
}

module.exports = {
  ROOT,
  CANONICAL_DIR,
  PROFILES_DIR,
  loadCareer,
  loadProfile,
  listProfileIds,
};

if (require.main === module) {
  process.stdout.write(`${JSON.stringify(loadCareer(), null, 2)}\n`);
}
