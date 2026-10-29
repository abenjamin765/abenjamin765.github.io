#!/usr/bin/env node
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'diagram-check-'));
try {
 const config=JSON.parse(fs.readFileSync(path.join(root,'evals/fan-out.json'),'utf8'));
 config.widths=[949,390];
 const configPath=path.join(tmp,'config.json');fs.writeFileSync(configPath,JSON.stringify(config));
 const fixture=fs.readFileSync(path.join(root,'evals/fan-out.html'),'utf8');
 const good=path.join(tmp,'good.html'),bad=path.join(tmp,'bad.html');
 fs.writeFileSync(good,fixture);fs.writeFileSync(bad,fixture.replace('<body>','<body class="broken">'));
 const run=(file,name)=>spawnSync(process.execPath,[path.join(__dirname,'check-diagram.cjs'),'--page',file,'--config',configPath,'--out',path.join(tmp,name)],{encoding:'utf8',timeout:90000});
 const pass=run(good,'good');if(pass.status!==0)throw new Error(`Correct fixture failed: ${pass.stdout}\n${pass.stderr}`);
 const fail=run(bad,'bad');if(fail.status!==1)throw new Error(`Broken fixture should return 1, got ${fail.status}: ${fail.stdout}\n${fail.stderr}`);
 const report=JSON.parse(fs.readFileSync(path.join(tmp,'bad/report.json'),'utf8'));
 const issues=report.widths.find(w=>w.width===949).failures;
 if(!issues.some(x=>x.includes('not centered')) || !issues.some(x=>x.includes('endpoint')))throw new Error('Checker did not detect both misalignment and disconnected endpoints');
 console.log('PASS: correct fan-out renders; broken connector junctions and peer-header alignment are rejected.');
} catch(error) {console.error(error.message);process.exitCode=1;}
finally {fs.rmSync(tmp,{recursive:true,force:true});}
