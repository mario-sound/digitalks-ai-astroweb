import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {parseHTML} from 'linkedom';import YAML from 'yaml';
const collection=name=>fs.readdirSync('content/'+name).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(`content/${name}/${f}`)));
const pages=['pages','services','legal'].flatMap(collection);const original=JSON.parse(fs.readFileSync('docs/original/audit.json'));
const resolveUrl=url=>{const u=new URL(url,'https://local.test');const p=decodeURIComponent(u.pathname);return 'dist'+p+(p.endsWith('/')?'index.html':'')};
const docs=new Map(pages.map(p=>[p.path,parseHTML(fs.readFileSync(resolveUrl(p.path),'utf8')).document]));
const exists=url=>fs.existsSync(resolveUrl(url));
test('every discovered route is built, with unique paths and localized SEO',()=>{
 assert.equal(new Set(pages.map(p=>p.path)).size,pages.length);
 for(const p of original.pages)assert.ok(docs.has(p.path)||fs.existsSync(resolveUrl(p.path)),p.path);
 for(const p of pages){const d=docs.get(p.path);assert.equal(d.documentElement.lang,p.lang);assert.equal(d.querySelectorAll('main').length,1,p.path);assert.equal(d.querySelectorAll('h1').length,1,p.path);assert.ok(d.querySelector('title').textContent);assert.ok(d.querySelector('meta[name="description"]'));assert.ok(d.querySelector('link[rel="canonical"]').href.startsWith('https://digitalks-ai.com/'));assert.ok(!d.body.innerHTML.includes('{{'),p.path);assert.ok(!d.querySelector('script[src*="wp-"]'));for(const l of d.querySelectorAll('link[hreflang]'))assert.ok(exists(l.href.replace('https://digitalks-ai.com','')),l.href);}
});
test('all internal navigation and fragments resolve',()=>{
 const errors=[];
 for(const [route,d]of docs)for(const el of d.querySelectorAll('a[href]')){
 const href=el.getAttribute('href');if(!href.startsWith('/')&&!href.startsWith('#'))continue;
 const u=new URL(href,'https://local.test'+route);
 if(!exists(u.pathname))errors.push(route+' -> '+href);
 if(u.hash&&u.hash!=='#'&&docs.has(u.pathname)&&!docs.get(u.pathname).getElementById(decodeURIComponent(u.hash.slice(1))))errors.push(route+' missing anchor '+href);
 }assert.deepEqual(errors,[]);
});
test('all page images, sources, scripts and CSS resources exist locally',()=>{
 const errors=[];
 for(const [route,d]of docs){
 for(const el of d.querySelectorAll('img[src],source[src],script[src],link[rel="stylesheet"]')){
 const src=el.getAttribute('src')||el.getAttribute('href');if(src.startsWith('data:'))continue;
 if(!src.startsWith('/')||!exists(src))errors.push(route+' -> '+src);
 }
 for(const style of d.querySelectorAll('style'))for(const m of style.textContent.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g))if(!m[1].startsWith('data:')&&!m[1].startsWith('#')&&(!m[1].startsWith('/')||!exists(m[1].split('?')[0].split('#')[0])))errors.push(route+' CSS -> '+m[1]);
 }assert.deepEqual([...new Set(errors)],[]);
});
test('audio demos have valid files, metadata and native accessible controls',()=>{
 const demos=collection('demos');assert.equal(demos.length,16);
 for(const demo of demos){assert.ok(demo.title&&demo.character&&demo.language&&demo.source);assert.ok(exists(demo.audio),demo.audio);assert.ok(fs.statSync(resolveUrl(demo.audio)).size>1000);}
 for(const d of docs.values())for(const audio of d.querySelectorAll('audio')){assert.ok(audio.hasAttribute('controls'));assert.ok(!audio.hasAttribute('autoplay'));assert.ok(audio.hasAttribute('aria-label'));}
});
test('forms cannot submit until real Sender IDs are configured',()=>{
 const general=JSON.parse(fs.readFileSync('content/settings/general.json'));
 if(!general.senderEnabled){for(const d of docs.values()){assert.equal(d.querySelectorAll('[data-sender-form-id]').length,0);for(const form of d.querySelectorAll('form')){assert.ok(form.hasAttribute('data-unconfigured'));assert.ok(form.querySelector('[type="submit"]').hasAttribute('disabled'));assert.ok(!form.querySelector('[type="hidden"]'));for(const input of form.querySelectorAll('input,textarea,select'))assert.ok(form.querySelector(`label[for="${input.id}"]`));}}}
});
test('CMS schema covers all content categories and uses official blocks',()=>{
 const cms=YAML.parse(fs.readFileSync('.pages.yml','utf8'));
 for(const name of ['pages','services','demos','characters','languages','navigation','general','forms','seo','legal'])assert.ok(cms.content.find(c=>c.name===name),name);
 for(const c of cms.content)assert.ok(fs.existsSync(c.path),c.path);
 const blocks=cms.content.find(c=>c.name==='pages').fields.find(f=>f.name==='sections');assert.equal(blocks.type,'block');assert.equal(blocks.blockKey,'type');assert.ok(blocks.blocks.some(b=>b.name==='commercial'));
});
test('basic accessibility: labels, landmarks, alt text, skip link and mobile control',()=>{
 for(const [route,d]of docs){assert.ok(d.querySelector('.skip-link[href="#content"]'),route);assert.ok(d.querySelector('header nav[aria-label]'));assert.ok(d.querySelector('footer nav[aria-label]'));assert.ok(d.querySelector('button[aria-controls="site-navigation"][aria-expanded]'));for(const img of d.querySelectorAll('img'))assert.ok(img.hasAttribute('alt'),route);}
});
test('preview blocks indexing and sitemap covers every route',()=>{
 const general=JSON.parse(fs.readFileSync('content/settings/general.json'));
 for(const d of docs.values())if(general.preview)assert.equal(d.querySelector('meta[name="robots"]').content,'noindex,nofollow');
 const xml=fs.readFileSync('dist/sitemap.xml','utf8');for(const p of pages)assert.ok(xml.includes('https://digitalks-ai.com'+p.path));
 if(general.preview)assert.ok(fs.readFileSync('dist/robots.txt','utf8').includes('Disallow: /'));
});
test('FTPS refuses absent secrets and unauthorized production before any network connection',async()=>{
 const{spawnSync}=await import('node:child_process');
 const base={PATH:process.env.PATH};
 const missing=spawnSync('python3',['scripts/deploy-ftps.py'],{env:base,encoding:'utf8'});assert.notEqual(missing.status,0);assert.ok(missing.stderr.includes('Missing Hostinger'));
 const unauthorized=spawnSync('python3',['scripts/deploy-ftps.py'],{env:{...base,HOSTINGER_FTP_HOST:'example.invalid',HOSTINGER_FTP_USER:'test',HOSTINGER_FTP_PASSWORD:'test',HOSTINGER_FTP_DIR:'/public_html',HOSTINGER_DEPLOY_TARGET:'production'},encoding:'utf8'});assert.notEqual(unauthorized.status,0);assert.ok(unauthorized.stderr.includes('authorization is missing'));
});
