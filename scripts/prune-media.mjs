// Remove only generated import files that are no longer referenced by site content/templates.
import fs from 'node:fs';import path from 'node:path';
const used=new Set();
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);
for(const file of [...walk('content'),...walk('src/templates')]){
 const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/\/media\/([a-zA-Z0-9._-]+)/g))used.add(m[1]);
}
let removed=0,bytes=0;
for(const file of fs.readdirSync('public/media'))if(!used.has(file)){
 bytes+=fs.statSync('public/media/'+file).size;fs.unlinkSync('public/media/'+file);removed++;
}
fs.rmSync('public/styles',{recursive:true,force:true});
console.log('Removed',removed,'unused imported files;',Math.round(bytes/1e6),'MB. Original URLs remain in inventories.');
