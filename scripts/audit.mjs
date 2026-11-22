// Read-only crawler: GET public pages/assets only. Never submits forms.
import { parseHTML } from 'linkedom';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const origin = 'https://digitalks-ai.com';
const out = 'docs/original';
await mkdir(out, {recursive:true});
await mkdir('public/media', {recursive:true});
const records = [], assets = new Map(), pages = [];
const get = async url => {
  for(let attempt=0;attempt<3;attempt++) try {
    const response = await fetch(url,{signal:AbortSignal.timeout(45000), headers:{'User-Agent':'DigiTalks-Migration-Audit/1.0'}});
    const data = Buffer.from(await response.arrayBuffer());
    return {url, finalUrl:response.url, status:response.status, type:response.headers.get('content-type')||'',bytes:data.length,data};
  } catch(e) { if(attempt===2) return {url,status:0,error:String(e),data:Buffer.alloc(0),bytes:0,type:''}; }
};
const savePublic = async (url, filename) => {const r=await get(url);await writeFile(`${out}/${filename}`,r.data);records.push({...r,data:undefined});return r.data.toString()};
const robots=await savePublic(origin+'/robots.txt','robots.txt');
const sitemap=await savePublic(origin+'/sitemap_index.xml','sitemap_index.xml');
const urls = new Set([origin+'/']);
for(const sm of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
 const xml=await savePublic(sm[1],new URL(sm[1]).pathname.slice(1));
 for(const m of xml.matchAll(/<loc>(.*?)<\/loc>/g))urls.add(m[1]);
}
function asset(url,source) {
 try {url=new URL(url.replace(/&amp;/g,'&').replace(/["']+$/,''),source).href;}catch{return}
 if(!/^https?:/.test(url))return;
 if(!assets.has(url))assets.set(url,{url,sources:new Set(),local:'/media/'+createHash('sha256').update(url).digest('hex').slice(0,12)+'-'+(decodeURIComponent(new URL(url).pathname.split('/').pop())||'asset').replace(/[^a-zA-Z0-9._-]/g,'_')});
 assets.get(url).sources.add(source);
}
function cssAssets(css,base) {for(const m of css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g))if(!m[1].startsWith('data:')&&!m[1].startsWith('#'))asset(m[1],base);}
for(const url of urls) {
 const key=new URL(url).pathname.replace(/^\/+|\/+$/g,'').replaceAll('/','__')||'home';
 const r=await get(url);await writeFile(`${out}/${key}.html`,r.data);records.push({...r,data:undefined});
 if(r.status!==200||!r.type.includes('text/html'))continue;
 const html=r.data.toString().replace(/src=(https:\/\/[^\s"<>]+)"/g,'src="$1"');
 const {document}=parseHTML(html);
 for(const a of document.querySelectorAll('a[href],link[hreflang]')){
  try{const u=new URL(a.getAttribute('href'),url);if(u.origin===origin&&!u.search&&!/\.(xml|png|mp3|jpe?g|pdf|webp|svg)$|\/wp-|\/feed\//.test(u.pathname))urls.add(origin+u.pathname);}catch{}
 }
 for(const el of document.querySelectorAll('img,source,audio,video,link[rel="stylesheet"],link[rel="icon"]')){
   const src=el.getAttribute('src')||el.getAttribute('href');if(src)asset(src,url);
   const srcset=el.getAttribute('srcset');if(srcset)for(const v of srcset.split(','))asset(v.trim().split(/\s+/)[0],url);
 }
 for(const el of document.querySelectorAll('[style]'))cssAssets(el.getAttribute('style'),url);
 for(const el of document.querySelectorAll('style'))cssAssets(el.textContent,url);
 pages.push({url,key,path:new URL(url).pathname,lang:document.documentElement.lang?.startsWith('en')?'en':'es',title:document.querySelector('title')?.textContent,description:document.querySelector('meta[name="description"]')?.content||'',canonical:document.querySelector('link[rel="canonical"]')?.href||'',alternates:[...document.querySelectorAll('link[hreflang]')].map(x=>({lang:x.hreflang||x.getAttribute('hreflang'),url:x.href})),headings:[...document.querySelectorAll('h1,h2,h3')].map(x=>({level:x.tagName,text:x.textContent.trim()})),forms:[...document.querySelectorAll('form')].map(f=>({name:f.getAttribute('name'),action:f.getAttribute('action'),method:f.getAttribute('method'),fields:[...f.querySelectorAll('input,textarea,select')].map(x=>({type:x.type,name:x.name,id:x.id,required:x.hasAttribute('required'),placeholder:x.getAttribute('placeholder'),value:x.type==='hidden'?x.value:undefined})),text:f.textContent.trim()})),links:[...document.querySelectorAll('a[href]')].map(x=>({text:x.textContent.trim(),href:x.getAttribute('href')})),bodyClass:document.body.className,styles:[...document.querySelectorAll('link[rel="stylesheet"]')].map(x=>x.href),structuredData:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>x.textContent)});
 console.log('PAGE',r.status,url);
 if(pages.length>75)throw Error('Safety page limit');
}
let pending=[...assets.values()],done=new Set();
while(pending.length) {
 for(let i=0;i<pending.length;i+=6)await Promise.all(pending.slice(i,i+6).map(async a=>{
  done.add(a.url);const r=await get(a.url);Object.assign(a,{status:r.status,type:r.type,bytes:r.bytes,finalUrl:r.finalUrl,error:r.error});
  if(r.status===200){await writeFile('public'+a.local,r.data);if(r.type.includes('css')||a.local.endsWith('.css'))cssAssets(r.data.toString(),a.url);}
 }));
 pending=[...assets.values()].filter(a=>!done.has(a.url));
 console.log('ASSETS',done.size,'pending',pending.length);
}
const assetList=[...assets.values()].map(a=>({...a,sources:[...a.sources]}));
await writeFile(`${out}/audit.json`,JSON.stringify({date:new Date().toISOString(),pages,requests:records,assets:assetList},null,2));
const csv=rows=>rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
await writeFile('docs/INVENTARIO_URLS.csv',csv([['URL','Final URL','Status','Content type','Bytes'],...records.map(r=>[r.url,r.finalUrl,r.status,r.type,r.bytes])]));
await writeFile('docs/INVENTARIO_MEDIA.csv',csv([['Original URL','Local path','Status','Type','Bytes','Source pages'],...assetList.map(a=>[a.url,a.local,a.status,a.type,a.bytes,a.sources.join(' | ')])]));
console.log('AUDIT COMPLETE',pages.length,'pages',assetList.length,'assets');
