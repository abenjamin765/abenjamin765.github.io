import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const app=process.env.GREEN_LOOM_APP || path.join(os.homedir(),'Sites/greenloom/retail/apps/retail-admin');
const dir=repo+'/src/prototypes/green-loom';
const req=createRequire(app+'/package.json');
const {build}=await import(createRequire(req.resolve('vitest/package.json')).resolve('vite'));
const out=repo+'/dist/prototypes/green-loom';
function replaceRequired(code, before, after, id) { if (!code.includes(before)) throw new Error(`Portfolio adapter no longer matches ${id}`); return code.replace(before, after); }
const upstreamHashes = {};
const productImagesPlugin={name:'portfolio-product-images',enforce:'pre',transform(code,id){
 if (id.startsWith(app) && !id.includes('/node_modules/')) upstreamHashes[path.relative(app,id)] = crypto.createHash('sha256').update(code).digest('hex');
 if(id.endsWith('/components/catalog/catalog-detail.tsx')) {
  const headerStart=code.indexOf('        <CatalogDetailIdentityHeader');
  const headerEnd=code.indexOf('        <Tabs value=',headerStart);
  if (headerStart < 0 || headerEnd < 0) throw new Error('Catalog header adapter no longer matches upstream');
  const header=code.slice(headerStart,headerEnd);
  code=code.slice(0,headerStart)+code.slice(headerEnd);
  code=replaceRequired(code, '<OperatorSegmentNav>', '<div className="demo-detail-heading">'+header+'<OperatorSegmentNav>', id);
  return replaceRequired(code, '</OperatorSegmentNav>', '</OperatorSegmentNav></div>', id);
 }
 if(id.endsWith('/components/catalog/catalog-panel.tsx')) return replaceRequired(replaceRequired(code, 'src="/demo/catalog-sample.jpg"', 'src={summary.imageUrl ?? "/demo/catalog-sample.jpg"}', id), 'className="size-full object-cover"', 'className="size-full object-contain"', id);
 if(id.endsWith('/components/catalog/product-section.tsx')) return replaceRequired(code, 'function galleryImagesFor(detail: CatalogProductViewModel): readonly ImageGalleryItem[] {', 'function galleryImagesFor(detail: CatalogProductViewModel): readonly ImageGalleryItem[] {\n if (detail.summary.imageUrl) return [{id:"img-primary",alt:detail.primaryImageAlt,src:detail.summary.imageUrl}];', id);
 if(id.endsWith('/components/patterns/image-gallery-field.tsx')) return replaceRequired(code, 'role="img"', 'style={image.src ? {backgroundImage: `url(${image.src})`,backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center"} : undefined} role="img"', id);
}};
await build({configFile:false,root:dir,plugins:[productImagesPlugin],resolve:{alias:[{find:'@',replacement:app},{find:'next/link',replacement:dir+'/link.tsx'},...['react','react-dom','lucide-react','radix-ui','class-variance-authority','clsx','tailwind-merge','cmdk'].map(name=>({find:new RegExp('^'+name+'($|/)'),replacement:app+'/node_modules/'+name+'$1'}))]},define:{'process.env.NODE_ENV':'"production"'},build:{outDir:out,emptyOutDir:true,lib:{entry:dir+'/main.tsx',name:'GreenLoomPrototype',formats:['iife'],fileName:()=> 'prototype.js'},cssCodeSplit:false},oxc:{jsx:{runtime:'automatic'}}});
const postcss=createRequire(req.resolve('@tailwindcss/postcss'))('postcss');
const tailwind=req('@tailwindcss/postcss');
let css=fs.readFileSync(app+'/app/tokens.css','utf8').replaceAll('../app/',app+'/app/').replaceAll('../components/',app+'/components/').replaceAll('../lib/',app+'/lib/');
const result=await postcss([tailwind({base:app})]).process(css,{from:app+'/app/tokens.css'});
const extra=`html,body,#root{height:100%;margin:0}body{font-family:Arial,sans-serif;color:#212124}.demo{height:100%;display:flex;flex-direction:column;background:#fafafa}.demo-nav{height:64px;flex-shrink:0;background:#212124;color:white;display:flex;align-items:center;gap:16px;padding:0 24px}.demo-nav>span{margin-left:auto;font-size:13px;color:#cbd5e1}.demo-nav button{color:white}.demo-workspace{display:grid;grid-template-columns:330px minmax(0,1fr);flex:1;min-height:0}.demo-list{display:flex;flex-direction:column;min-height:0;border-right:1px solid #e2e8f0;background:#fff}.demo-store{padding:20px;display:grid;gap:4px;border-bottom:1px solid #e2e8f0}.demo-store span{color:#64748b;font-size:12px}.demo-collection{flex:1;min-height:0}.demo-detail{padding:28px;overflow:auto;min-width:0}.demo-empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;max-width:340px;margin:auto}.demo-empty h1{font-size:22px;font-weight:600}.demo-empty p{font-size:14px;color:#64748b;line-height:1.6}.demo-back{display:none}.demo-message{font-size:13px;color:#166534;margin-top:16px}.catalog-tab-slide{overflow:hidden}@media(max-width:650px){.demo-workspace{display:block;position:relative}.demo-list{height:100%;border-right:0}.demo-detail{display:none;height:100%;padding:20px}.has-detail .demo-list{display:none}.has-detail .demo-detail{display:block}.demo-back{display:inline-flex;margin-bottom:20px}.demo-nav{padding:0 16px}.demo-nav>span{font-size:12px}}`;
const emitted=fs.existsSync(out+'/resume.css')?fs.readFileSync(out+'/resume.css','utf8'):'';
fs.writeFileSync(out+'/prototype.css',result.css+'\n'+emitted+'\n'+extra);
fs.copyFileSync(dir+'/index.html',out+'/index.html');
fs.copyFileSync(dir+'/polish.css',out+'/polish.css');
fs.copyFileSync(out+'/prototype.css',dir+'/prototype.css');
fs.copyFileSync(out+'/prototype.js',dir+'/prototype.js');
const imagePath='/assets/img/folio/project--green-loom/catalog-sample.jpg';
fs.writeFileSync(out+'/prototype.js',fs.readFileSync(out+'/prototype.js','utf8').replaceAll('/demo/catalog-sample.jpg',imagePath).replace(/[ \t]+$/gm,''));
fs.copyFileSync(out+'/prototype.js',dir+'/prototype.js');
fs.mkdirSync(repo+'/dist/assets/img/folio/project--green-loom',{recursive:true});
fs.copyFileSync(app+'/public/demo/catalog-sample.jpg',repo+'/dist'+imagePath);
fs.mkdirSync(repo+'/src/assets/img/folio/project--green-loom',{recursive:true});
fs.copyFileSync(app+'/public/demo/catalog-sample.jpg',repo+'/src/assets/img/folio/project--green-loom/catalog-sample.jpg');

const productsDir=repo+'/src/assets/img/folio/project--green-loom/products';
fs.cpSync(productsDir,repo+'/dist/assets/img/folio/project--green-loom/products',{recursive:true,filter:source=>fs.statSync(source).isDirectory() || /\.(png|jpe?g|webp)$/i.test(source)});

const upstreamCommit = execFileSync('git', ['rev-parse', 'HEAD'], {cwd:app,encoding:'utf8'}).trim();
const upstreamDirty = Boolean(execFileSync('git',['status','--porcelain'],{cwd:app,encoding:'utf8'}).trim());
fs.writeFileSync(dir+'/upstream-snapshot.json', JSON.stringify({commit:upstreamCommit,hasLocalChanges:upstreamDirty,sourceHashes:upstreamHashes},null,2)+'\n');
