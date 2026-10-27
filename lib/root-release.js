const fs = require('node:fs');
const path = require('node:path');
const {portfolioSite, portfolioProjects} = require('./portfolio-data')();

// Explicit public routes: research, notes, source sidecars and prototype snapshots
// are intentionally outside this release boundary.
const pages = ['index.html', 'work.html', ...Object.values(portfolioProjects).map(p => p.href.slice(1)), 'shapes.html'];
const extensions = new Set(['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.ico', '.woff', '.woff2', '.pdf']);
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function metadata(html, filename) {
  const route = filename === 'index.html' ? '/' : '/' + filename;
  const canonical = portfolioSite.baseUrl + route;
  const title = html.match(/<title>(.*?)<\/title>/s)[1];
  const description = html.match(/name="description" content="([^"]*)"/)[1];
  const project = Object.values(portfolioProjects).find(p => p.href === route);
  const share = portfolioSite.baseUrl + (project?.shareImage || portfolioSite.shareImage);
  const schema = {'@context':'https://schema.org', '@type': filename === 'index.html' ? 'ProfilePage' : 'WebPage', name:title, description, url:canonical, mainEntity:{'@type':'Person',name:portfolioSite.name,url:portfolioSite.baseUrl}};
  return html.replace('</head>', `
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${share}">
<meta property="og:image:alt" content="${escape(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${share}">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
</head>`);
}

function publishRootRelease(root) {
  const source = path.join(root, 'newsite');
  const output = path.join(root, 'dist');
  // Remove a previous indiscriminate preview copy, including its internal notes.
  fs.rmSync(path.join(output, 'newsite'), {recursive:true, force:true});
  function copyDirectory(relative) {
    for (const entry of fs.readdirSync(path.join(source, relative), {withFileTypes:true})) {
      const name = path.join(relative, entry.name);
      if (entry.isDirectory()) copyDirectory(name);
      else if (extensions.has(path.extname(name)) || name === 'prototypes/green-loom/index.html' || name === 'assets/icons/lucide/LICENSE') {
        // The newly generated résumé PDF owns this destination.
        if (name === 'assets/Aaron-Benjamin-Resume.pdf') continue;
        for (const prefix of ['', 'newsite']) {
          const target = path.join(output, prefix, name);
          fs.mkdirSync(path.dirname(target), {recursive:true});
          fs.copyFileSync(path.join(source, name), target);
        }
      }
    }
  }
  for (const dir of ['img', 'assets', 'prototypes']) copyDirectory(dir);
  for (const prefix of ['', 'newsite']) {
    fs.copyFileSync(path.join(source, 'assets/img/folio/favicon.svg'), path.join(output, prefix, 'favicon.svg'));
  }
  for (const entry of fs.readdirSync(source)) {
    if (['.css', '.js'].includes(path.extname(entry))) {
      for (const prefix of ['', 'newsite']) fs.copyFileSync(path.join(source, entry), path.join(output, prefix, entry));
    }
  }
  for (const filename of pages) {
    const html = metadata(fs.readFileSync(path.join(source, filename), 'utf8'), filename);
    fs.writeFileSync(path.join(output, filename), html);
    // Keep existing preview links usable; search and shares point at the root.
    fs.writeFileSync(path.join(output, 'newsite', filename), html);
  }
  // Preview résumé/writing links are root absolute; PDF remains usable at both URLs.
  const pdf = path.join(output, 'assets/Aaron-Benjamin-Resume.pdf');
  if (fs.existsSync(pdf)) fs.copyFileSync(pdf, path.join(output, 'newsite/assets/Aaron-Benjamin-Resume.pdf'));
  fs.writeFileSync(path.join(output, 'CNAME'), new URL(portfolioSite.baseUrl).hostname + '\n');
  fs.writeFileSync(path.join(output, '.nojekyll'), '');
}

module.exports = {publishRootRelease, pages};
