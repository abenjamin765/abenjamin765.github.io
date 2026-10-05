const fs = require('node:fs');
const path = require('node:path');
const {portfolioSite, portfolioProjects} = require('../lib/portfolio-data')();
module.exports = class Sitemap {
  data() { return {permalink:'/sitemap.xml', eleventyExcludeFromCollections:true}; }
  render() {
    const posts=fs.readdirSync(path.join(__dirname,'blog')).filter(file=>file.endsWith('.md')).map(file=>'/blog/'+file.replace(/\.md$/, '')+'/');
    const routes=['/','/resume.html','/writing.html',...Object.values(portfolioProjects).map(p=>p.href),...posts];
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(route=>'<url><loc>'+portfolioSite.baseUrl+route+'</loc></url>').join('')+'</urlset>\n';
  }
};
