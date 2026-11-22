import {test}from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import {parseHTML}from'linkedom';import YAML from'yaml';
const baseline=JSON.parse(fs.readFileSync('docs/design/content-baseline.json'));const visualKeys=['surface','layout','artwork','actions','featuredDemos'];
function editorial(page){const value=structuredClone(page);delete value.design;for(const s of value.sections||[])for(const key of visualKeys)delete s[key];return value}
test('redesign preserves every original editorial record, demo, form and SEO value',()=>{
 for(const[file,{value}]of Object.entries(baseline)){const actual=JSON.parse(fs.readFileSync('content/'+file));if(/^(pages|services|legal)\//.test(file))assert.deepEqual(editorial(actual),value,file);else assert.deepEqual(actual,value,file);}
});
test('all original visible content, images, destinations and audio associations survive rendering',()=>{
 const records=JSON.parse(fs.readFileSync('docs/design/functional-baseline.json'));
 for(const before of records){const{document:d}=parseHTML(fs.readFileSync('dist'+before.path+'index.html','utf8'));const text=d.querySelector('main').textContent.replace(/\s/g,'');
 // Compare original semantic fragments; new hero actions/demos may sit between them.
 for(const fragment of before.fragments)assert.ok(text.includes(fragment),before.path+' missing content fragment: '+fragment);
 const images=new Set([...d.querySelectorAll('img[src]')].map(i=>i.getAttribute('src')));for(const src of before.images)assert.ok(images.has(src),before.path+' image '+src);
 const links=new Set([...d.querySelectorAll('a[href]')].map(i=>i.getAttribute('href')));for(const href of before.links)assert.ok(links.has(href),before.path+' link '+href);
 for(const audio of before.audios){const elements=[...d.querySelectorAll('audio')].filter(a=>a.getAttribute('data-demo')===audio.id);assert.ok(elements.some(a=>a.querySelector('source').getAttribute('src')===audio.src&&a.getAttribute('aria-label')===audio.label),before.path+' audio '+audio.id);}
 const forms=[...d.querySelectorAll('form')].map(f=>({fields:[...f.querySelectorAll('input,select,textarea')].map(i=>({name:i.name,type:i.getAttribute('type'),required:i.hasAttribute('required')}))}));assert.deepEqual(forms,before.forms,before.path+' form contract');
 }
});
test('every route uses the shared visual system without exporting the legacy page styles',()=>{
 for(const[file,{value:p}]of Object.entries(baseline).filter(([k])=>/^(pages|services|legal)\//.test(k))){const html=fs.readFileSync('dist'+p.path+'index.html','utf8');assert.ok(html.includes('digitalks-design'),file);assert.ok(!html.includes('--e-global-color-'),file);assert.ok(html.includes('--dt-container'),file);}
});
test('CMS retains collections and offers optional visual composition fields',()=>{
 const schema=YAML.parse(fs.readFileSync('.pages.yml','utf8'));for(const name of ['pages','services','legal']){const sections=schema.content.find(c=>c.name===name).fields.find(f=>f.name==='sections');const fields=sections.blocks.find(b=>b.name==='migrated').fields;for(const key of visualKeys)assert.ok(fields.some(f=>f.name===key),name+' '+key);}
});
test('CMS preserves the complete original field tree, formats and storage paths',()=>{
 const before=YAML.parse(fs.readFileSync('docs/design/cms-baseline.yml','utf8'));const after=YAML.parse(fs.readFileSync('.pages.yml','utf8'));
 function fields(items,prefix=''){return(items||[]).flatMap(f=>[{path:prefix+f.name,type:f.type},...fields(f.fields,prefix+f.name+'.'),...(f.blocks||[]).flatMap(b=>fields(b.fields,prefix+f.name+':'+b.name+'.'))]);}
 assert.deepEqual(after.media,before.media);
 for(const original of before.content){const current=after.content.find(c=>c.name===original.name);assert.ok(current,original.name);assert.equal(current.path,original.path);assert.equal(current.format,original.format);const fieldMap=new Map(fields(current.fields).map(f=>[f.path,f.type]));for(const f of fields(original.fields))assert.equal(fieldMap.get(f.path),f.type,original.name+' '+f.path);}
});
