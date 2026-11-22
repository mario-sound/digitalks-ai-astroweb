// One-time import. Do not rerun after editorial changes: it replaces imported content.
import fs from 'node:fs/promises';
import path from 'node:path';
import {parseHTML} from 'linkedom';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const audit=JSON.parse(await fs.readFile('docs/original/audit.json','utf8'));
const origin='https://digitalks-ai.com';
const hash=s=>createHash('sha256').update(s).digest('hex').slice(0,12);
const assets=new Map(audit.assets.map(x=>[x.url,x]));
const normalize=s=>s.replaceAll('&amp;','&').replace(/["']+$/,'');
const migrated=s=>s.replaceAll('elementor','dt').replaceAll('wp-content','source-content');
const json=async(f,v)=>{await fs.mkdir(path.dirname(f),{recursive:true});await fs.writeFile(f,JSON.stringify(v,null,2)+'\n')};
const known=new Set(audit.pages.map(p=>p.path));
const optimizeCache=new Map();
for(const a of audit.assets) {
 a.served=a.local;
 if(a.status!==200||!/^image\/(png|jpeg)/.test(a.type)||a.bytes<100000)continue;
 const buffer=await fs.readFile('public'+a.local);const digest=hash(buffer);
 if(optimizeCache.has(digest)){a.served=optimizeCache.get(digest);continue}
 const dest='/media/'+digest+'.webp';
 await sharp(buffer).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:90}).toFile('public'+dest);
 a.served=dest;optimizeCache.set(digest,dest);
}
const local=(s,base=origin)=>{
 if(!s||s.startsWith('data:')||s.startsWith('#'))return s;
 let u;try{u=new URL(normalize(s),base)}catch{return s}
 const a=assets.get(u.href);if(a?.status===200)return a.served;
 if(u.origin===origin&&known.has(u.pathname))return u.pathname+u.hash;
 return u.href;
};
const localCss=(s,base)=>migrated(s.replace(/url\(\s*(['"]?)([^'"\s)]+)\1\s*\)/g,(_,q,u)=>`url("${local(u,base)}")`));
await fs.mkdir('public/styles',{recursive:true});
for(const a of audit.assets.filter(a=>a.type.includes('css'))){
 const css=await fs.readFile('public'+a.local,'utf8');
 // Static, locally served visual styles only. No original scripts or CMS runtime.
 await fs.writeFile('public/styles/'+path.basename(a.local),localCss(css,a.url));
}
const allDemos=[],characters=new Map(),pageMeta=[];
const navigation={es:[],en:[]};let logo='';let headerDone=false;
for(const page of audit.pages){
 let html=await fs.readFile(`docs/original/${page.key}.html`,'utf8');
 html=html.replace(/src=(https:\/\/[^\s"<>]+)"/g,'src="$1"');
 const {document:d}=parseHTML(html);
 if(!headerDone){logo=local(d.querySelector('header img')?.getAttribute('data-lazy-src')||d.querySelector('header img')?.getAttribute('src'));headerDone=true}
 const menus=[...d.querySelectorAll('header nav a')].filter(a=>!a.closest('.sub-menu')&&!a.classList.contains('has-submenu'));
 if(!navigation[page.lang].length)navigation[page.lang]=menus.map(a=>({label:a.textContent.trim(),href:local(a.href)})).filter((v,i,s)=>s.findIndex(x=>x.href===v.href)===i);
 const main=d.querySelector('[data-elementor-type="wp-page"]') || d.querySelector('main');
 if(!main)throw Error('Missing main '+page.path);
 // Keep exported visual selectors but remove authoring metadata and all source runtime.
 for(const el of main.querySelectorAll('script,noscript,link'))el.remove();
 let extraCss=[...main.querySelectorAll('style')].map(s=>s.textContent).join('\n');
 for(const s of main.querySelectorAll('style'))s.remove();
 for(const el of main.querySelectorAll('*')){
  for(const a of [...el.attributes])if(a.name.startsWith('on')||a.name.startsWith('data-')&&!['data-demo','data-form'].includes(a.name)){
   if(a.name==='data-lazy-src')el.setAttribute('src',a.value);
   if(a.name==='data-lazy-srcset')el.setAttribute('srcset',a.value);
   if(a.name==='data-lazy-sizes')el.setAttribute('sizes',a.value);
   el.removeAttribute(a.name);
  }
  for(const attr of ['src','poster','href'])if(el.hasAttribute(attr))el.setAttribute(attr,local(el.getAttribute(attr),page.url));
  if(el.hasAttribute('srcset'))el.setAttribute('srcset',el.getAttribute('srcset').split(',').map(s=>{const [url,size]=s.trim().split(/\s+/);return local(url,page.url)+(size?' '+size:'')}).join(', '));
  if(el.hasAttribute('style'))el.setAttribute('style',localCss(el.getAttribute('style'),page.url));
  if(el.tagName==='IMG'){el.setAttribute('loading','lazy');el.setAttribute('decoding','async');}
  el.classList.remove('elementor-invisible');
 }
 // Replace external frames/video loaders with explicit outbound links (no third-party requests).
 for(const frame of main.querySelectorAll('iframe,.rll-youtube-player')){
  const href=frame.getAttribute('src')||frame.querySelector('a')?.href||page.url;
  const a=d.createElement('a');a.href=href;a.className='external-media';a.textContent=page.lang==='en'?'Open original media':'Abrir medio original';frame.replaceWith(a);
 }
 const sectionNodes=[...main.children].filter(x=>x.tagName!=='STYLE');
 const sections=[];
 for(let si=0;si<sectionNodes.length;si++){
  const section=sectionNodes[si];const id=`${page.key}-${si+1}`;
  const sectionData={id,label:(section.querySelector('h1,h2,h3')?.textContent||section.textContent).trim().replace(/\s+/g,' ').slice(0,100)||`Sección ${si+1}`,template:id,enabled:true,texts:[],images:[],links:[],forms:[]};
  for(const form of section.querySelectorAll('form')){
   const formId=`${page.key}-${form.getAttribute('name')||hash(form.outerHTML)}`;
   const fields=[...form.querySelectorAll('input:not([type="hidden"]),textarea,select')].map(el=>({name:el.name,label:form.querySelector(`label[for="${el.id}"]`)?.textContent.trim()||el.getAttribute('placeholder')||el.name,type:el.tagName==='TEXTAREA'?'textarea':el.tagName==='SELECT'?'select':el.type||'text',required:el.hasAttribute('required'),placeholder:el.getAttribute('placeholder')||'',options:[...el.querySelectorAll('option')].map(x=>({label:x.textContent,value:x.value}))}));
   await json(`content/forms/${formId}.json`,{id:formId,title:form.getAttribute('name')||formId,lang:page.lang,source:page.url,fields,submit:form.querySelector('[type="submit"]')?.textContent.trim()||'Enviar',status:'unconfigured',senderFormId:'',notice:page.lang==='en'?'This form is not connected yet. No data will be sent.':'Formulario pendiente de conexión. No se enviarán datos.'});
   const slot=d.createElement('div');slot.setAttribute('data-form-slot',formId);form.replaceWith(slot);sectionData.forms.push({slot:formId,form:formId});
  }
  for(const audio of section.querySelectorAll('audio')){
   const src=audio.querySelector('source')?.src||audio.src;
   const original=[...assets.values()].find(a=>a.served===src)?.url||src;
   const filename=path.basename(new URL(original,origin).pathname);
   const demoId=hash(original);
   const card=audio.closest('.dt-player,.dtp2-player')||audio.parentElement;
   const label=card.querySelector('.dt-player__title,.dtp2-title')?.textContent.trim()||filename.replace('.mp3','');
   const language=filename.match(/(esES|enUS|enUK|itIT|frFR|deDE|plPL|ptBR)/)?.[1]||page.lang;
   const character=filename.startsWith('Old_Man')?'old-man':filename.startsWith('GirlChild')?'girl-child':hash(filename);
   const image=section.querySelector('img')?.src||'';
   if(!allDemos.some(x=>x.id===demoId)){
    const demo={id:demoId,title:label,character,language,audio:src,image,source:page.url,order:allDemos.length+1};allDemos.push(demo);await json(`content/demos/${demoId}.json`,demo);
   }
   if(!characters.has(character))characters.set(character,{id:character,title:label,image});
   const slot=d.createElement('div');slot.setAttribute('data-audio-slot',demoId);audio.replaceWith(slot);
  }
  for(const img of section.querySelectorAll('img')){
   const key='image-'+sectionData.images.length;sectionData.images.push({key,src:img.src,alt:img.getAttribute('alt')||''});
   img.setAttribute('src',`{{${key}:src}}`);img.setAttribute('alt',`{{${key}:alt}}`);img.removeAttribute('srcset');img.removeAttribute('sizes');
  }
  for(const link of section.querySelectorAll('a[href]')){
   const key='link-'+sectionData.links.length;sectionData.links.push({key,label:link.textContent.trim().slice(0,80),href:link.href});link.setAttribute('href',`{{${key}:href}}`);
  }
  function texts(node){for(const child of [...node.childNodes]){
   if(child.nodeType===3&&child.textContent.trim()){
    const value=child.textContent;const key='text-'+sectionData.texts.length;
    sectionData.texts.push({key,label:value.trim().slice(0,80),value});child.textContent=`{{${key}:value}}`;
   }else if(child.nodeType===1)texts(child);
  }}texts(section);
  await fs.writeFile(`src/templates/${id}.html`,migrated(section.outerHTML));sections.push(sectionData);
 }
 for(const [key,value]of characters)await json(`content/characters/${key}.json`,value);
 const cssName=page.key+'.css';
 let css=[...d.querySelectorAll('head style')].filter(s=>!s.id.includes('rocket-lazyload')).map(s=>s.textContent).join('\n')+'\n'+extraCss;
 await fs.writeFile('src/templates/'+cssName,localCss(css,page.url));
 const styles=page.styles.filter(u=>!u.includes('complianz')&&!u.includes('polylang')&&!u.includes('sticky-header')).map(u=>'/styles/'+path.basename(assets.get(u)?.local||''));
 const seo={id:page.key,title:page.title,description:page.description,canonical:page.path,alternates:page.alternates.map(x=>({lang:x.lang,path:new URL(x.url).pathname})),image:sections.flatMap(s=>s.images).find(x=>!x.src.startsWith('data:'))?.src||logo};
 await json(`content/seo/${page.key}.json`,seo);
 const category=/politica|privacy/.test(page.key)?'legal':page.key==='home'||page.key==='en__start'?'pages':'services';
 const record={id:page.key,title:page.title,path:page.path,lang:page.lang,seo:page.key,source:page.url,bodyClass:migrated(page.bodyClass),rootClass:migrated(main.className),styles,css:cssName,sections};
 await json(`content/${category}/${page.key}.json`,record);pageMeta.push(record);
}
for(const locale of ['es','en'])await json(`content/languages/${locale}.json`,{id:locale,title:locale==='es'?'Español':'English',home:locale==='es'?'/':'/en/start/',formError:locale==='es'?'No se pudo cargar el audio.':'Audio could not be loaded.'});
await json('content/settings/navigation.json',{es:navigation.es,en:navigation.en});
await json('content/settings/general.json',{title:'DigiTalks AI',url:origin,logo,preview:true,senderAccountId:'',senderEnabled:false});
const footer=dummy=>dummy;
await json('content/settings/footer.json',{es:{copyright:'Copyright © 2025 DigiTalks-AI. Todos los derechos reservados',credit:'Diseñado por DigiTalks|ai',links:[{label:'Política de privacidad',href:'/politica-de-privacidad/'},{label:'Política de cookies',href:'/politica-de-cookies-ue/'}],unlinked:'Términos y condiciones'},en:{copyright:'Copyright © 2025 DigiTalks-AI. All rights reserved',credit:'Designed by DigiTalks|ai',links:[{label:'Privacy Policy',href:'/en/privacy-policy/'},{label:'Cookie Policy',href:'/politica-de-cookies-ue/'}],unlinked:'Terms and conditions'}});
await json('docs/original/asset-map.json',[...assets.values()]);
console.log('IMPORTED',pageMeta.length,'pages',allDemos.length,'unique audio demos');
