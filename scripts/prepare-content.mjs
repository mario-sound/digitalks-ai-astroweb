import fs from 'node:fs/promises';
import {parseHTML} from 'linkedom';
const load=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const save=async(p,d)=>fs.writeFile(p,JSON.stringify(d,null,2)+'\n');
const assets=await load('docs/original/asset-map.json');
const pages=[];
for(const kind of ['pages','services','legal'])for(const filename of await fs.readdir('content/'+kind)){
 const path=`content/${kind}/${filename}`;const p=await load(path);
 let css='';
 for(const file of p.styles||[])css+=await fs.readFile('public'+file,'utf8')+'\n';
 css+=await fs.readFile('src/templates/'+p.css,'utf8');
 // Source style bundles have now become one editable-background static template per page.
 await fs.writeFile('src/templates/'+p.css,css);
 p.styles=[];
 p.backgrounds=[...new Set([...css.matchAll(/url\("(\/media\/[^"\s)]+)"\)/g)].map(m=>m[1]))].filter(src=>assets.some(a=>a.served===src&&a.type.startsWith('image/'))).map(src=>({original:src,src}));
 for(const s of p.sections)s.type='migrated';
 // Correct original heading hierarchy while retaining exact text and CSS selectors.
 let first=true;
 for(const s of p.sections){
  let html=await fs.readFile('src/templates/'+s.template+'.html','utf8');
  const {document}=parseHTML('<html><body>'+html+'</body></html>');
  for(const h of document.querySelectorAll('h1')){
   if(first){first=false;continue}
   const replacement=document.createElement('h2');for(const a of [...h.attributes])replacement.setAttribute(a.name,a.value);replacement.innerHTML=h.innerHTML;h.replaceWith(replacement);
  }
  // YouTube page had no H1: its first visible heading is promoted without changing wording.
  if(p.id==='doblaje-youtube'&&s===p.sections[0]){
   const h=document.querySelector('h2,h3,.dt-heading-title');if(h){const next=document.createElement('h1');for(const a of [...h.attributes])next.setAttribute(a.name,a.value);next.innerHTML=h.innerHTML;h.replaceWith(next);first=false;}
  }
  await fs.writeFile('src/templates/'+s.template+'.html',document.body.innerHTML);
 }
 await save(path,p);pages.push(p);
}
// Recover exact public demo labels, character images, order and language metadata.
const {document}=parseHTML((await fs.readFile('docs/original/home.html','utf8')).replace(/src=(https:\/\/[^\s"<>]+)"/g,'src="$1"'));
const demos=[];
for(const [order,audio]of [...document.querySelectorAll('audio')].entries()){
 const source=audio.querySelector('source').getAttribute('src');const asset=assets.find(x=>x.url===source);if(!asset)throw Error(source);
 let ancestor=audio.parentElement;while(ancestor&&!ancestor.querySelector('img'))ancestor=ancestor.parentElement;
 const imageSource=ancestor?.querySelector('img')?.getAttribute('data-lazy-src')||ancestor?.querySelector('img')?.getAttribute('src');
 const image=assets.find(x=>x.url===imageSource)?.served||'';
 const filename=source.split('/').pop();const prefix=filename.startsWith('Old_Man')?'old-man':filename.startsWith('GirlChild')?'girl-child':filename.replace('.mp3','').toLowerCase().replaceAll('_','-');
 const player=audio.parentElement;
 let title=player.querySelector('span')?.textContent.trim();if(!title)title=filename.startsWith('Old_Man')?'Old Man':filename.startsWith('GirlChild')?'Girl child':filename.replace('.mp3','');
 const language=filename.match(/(esES|enUS|enUK|itIT|frFR|deDE|plPL|ptBR)/)?.[1]||'esES';
 const demo={id:asset.local.split('/').pop().slice(0,12),title,character:prefix,language,audio:asset.served,image,source:'https://digitalks-ai.com/',order:order+1};
 await save('content/demos/'+demo.id+'.json',demo);demos.push(demo);
}
for(const f of await fs.readdir('content/characters'))await fs.unlink('content/characters/'+f);
for(const d of demos)await save('content/characters/'+d.character+'.json',{id:d.character,title:d.title,image:d.image});
await save('content/settings/ui.json',{es:{skip:'Ir al contenido',menu:'Alternar menú',navigation:'Menú principal',legal:'Información legal',consentTitle:'Gestionar consentimiento',consentText:'Sólo se almacena tu elección en este navegador. Los servicios externos opcionales permanecen bloqueados hasta que los aceptes.',necessary:'Sólo necesarias',optional:'Aceptar opcionales',privacy:'Política de privacidad'},en:{skip:'Skip to content',menu:'Toggle menu',navigation:'Main menu',legal:'Legal information',consentTitle:'Manage consent',consentText:'Only your choice is stored in this browser. Optional external services remain blocked until you accept them.',necessary:'Necessary only',optional:'Accept optional',privacy:'Privacy policy'}});
console.log('Prepared',pages.length,'pages; corrected demo metadata and heading hierarchy');
