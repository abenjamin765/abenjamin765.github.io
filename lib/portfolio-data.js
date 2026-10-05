const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
module.exports = function portfolioData() {
  const data = yaml.load(fs.readFileSync(path.join(__dirname, '../src/assets/data/portfolio.yml'), 'utf8'));
  for (const [id, project] of Object.entries(data.portfolioProjects)) {
    for (const field of ['id', 'title', 'href', 'description', 'seoTitle', 'shareImage', 'next', 'group']) {
      if (!project[field]) throw new Error(`Missing portfolio field ${id}.${field}`);
    }
    if (!data.portfolioProjects[project.next]) throw new Error(`Unknown next story for ${id}`);
    if (project.facts.length !== 4) throw new Error(`Expected four opening facts for ${id}`);
  }
  return data;
};
