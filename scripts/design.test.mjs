import {test}from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import crypto from'node:crypto';import {parseHTML}from'linkedom';import YAML from'yaml';
const baseline=JSON.parse(fs.readFileSync('docs/design/content-baseline.json'));
const read=p=>JSON.parse(fs.readFileSync(p));
const collection=n=>fs.readdirSync('content/'+n).filter(f=>f.endsWith('.json')).map(f=>read('content/'+n+'/'+f));
const pages=['pages','services','legal'].flatMap(collection);
const doc=p=>parseHTML(fs.readFileSync('dist'+p+'index.html','utf8')).document;
test('strategic rewrite preserves all original audio files and character/language associations',()=>{
 const demos=collection('demos');assert.equal(demos.length,16);
 for(const[file,{value}]of Object.entries(baseline).filter(([k])=>k.startsWith('demos/'))){const d=read('content/'+file);for(const key of ['id','audio','character','language','source','order'])assert.equal(d[key],value[key],file+' '+key);const current=fs.readFileSync('public'+d.audio);assert.equal(crypto.createHash('sha256').update(current).digest('hex'),read('docs/strategy/audio-sha256.json')[d.audio]);}
 for(const p of ['/','/en/start/']){const ids=[...doc(p).querySelectorAll('audio')].map(a=>a.dataset.demo);assert.equal(ids.length,16);assert.deepEqual(new Set(ids),new Set(demos.map(d=>d.id)));}
});
test('six commercial pages have paired translations, real CTAs and distinct service forms',()=>{
 const commercial=pages.filter(p=>p.commercial);assert.equal(commercial.length,6);assert.equal(collection('forms').length,6);
 for(const p of commercial){const d=doc(p.path);assert.equal(d.querySelectorAll('h1').length,1);assert.ok(d.querySelector('.b2b-contact form'));assert.ok(d.querySelector('footer a[href="mailto:audio@digitalks-ai.com"]'));assert.ok(d.querySelector('link[hreflang="'+(p.lang==='es'?'en':'es')+'"]'));assert.ok(!d.querySelector('.dt-widget-n-carousel'));}
});
test('every source route is active, explicitly redirected or retired without chains',()=>{
 const redirects=read('content/settings/redirects.json'),original=read('docs/original/audit.json');const active=new Set(pages.map(p=>p.path));
 const ht=fs.readFileSync('public/.htaccess','utf8');
 for(const p of original.pages)assert.ok(active.has(p.path)||redirects[p.path]||p.path==='/ots-audio-data-collection/',p.path);
 for(const[from,to]of Object.entries(redirects)){assert.ok(active.has(to.split('#')[0]));assert.ok(!redirects[to.split('#')[0]]);assert.ok(ht.includes(from.slice(1)+'?$ '+to+' [R=301,L,NE]'));assert.ok(fs.readFileSync('dist'+from+'index.html','utf8').includes(to));}
 assert.ok(ht.includes('RewriteRule ^ots-audio-data-collection/?$ - [G,L]'));
});
test('commercial CMS exposes copy, screenshots, demos, links, sections and form selection',()=>{
 const schema=YAML.parse(fs.readFileSync('.pages.yml','utf8'));
 for(const name of ['pages','services']){const fields=schema.content.find(c=>c.name===name).fields.find(f=>f.name==='sections').blocks.find(b=>b.name==='commercial').fields;for(const key of ['heading','body','items','image','alt','caption','demoIds','form','actions','enabled','surface'])assert.ok(fields.some(f=>f.name===key),key);}
 for(const p of pages.filter(p=>p.commercial)){assert.ok(p.sections.every(s=>s.type==='commercial'));for(const s of p.sections){assert.ok(s.heading);for(const id of s.demoIds||[])assert.ok(collection('demos').some(d=>d.id===id));if(s.form)assert.ok(collection('forms').some(f=>f.id===s.form));}}
});
test('public output excludes private documents, prices, client dashboard and unsupported catalogue offers',()=>{
 assert.equal(fs.existsSync('dist/refs'),false);
 const html=pages.filter(p=>p.commercial).map(p=>doc(p.path).querySelector('main').textContent).join(' ');
 assert.ok(!/€|3[.,]000|24\/7|AAA|crowdsourcing|smartphones|call centers/i.test(html));
 for(const p of pages.filter(p=>p.id.startsWith('datasets'))){const text=doc(p.path).querySelector('main').textContent;assert.ok(/FIGS/.test(text));assert.ok(/consent/i.test(text));assert.ok(!/48\s?kHz/.test(text));}
});
test('legal content and operational configuration remain preserved',()=>{
 for(const[file,{value}]of Object.entries(baseline).filter(([k])=>k.startsWith('legal/'))){const current=read('content/'+file);delete current.design;for(const s of current.sections)for(const k of ['surface','layout','artwork','actions','featuredDemos'])delete s[k];assert.deepEqual(current,value);}
 assert.deepEqual(read('content/settings/general.json'),baseline['settings/general.json'].value);
});
