// Adds presentation metadata only; existing commercial fragments/links/media remain unchanged.
import fs from'node:fs';import{parseHTML}from'linkedom';
for(const kind of ['pages','services','legal'])for(const file of fs.readdirSync('content/'+kind)){
 const path='content/'+kind+'/'+file;const p=JSON.parse(fs.readFileSync(path));p.design=true;
 const css=fs.readFileSync('src/templates/'+p.css,'utf8');
 for(const[sIndex,s]of p.sections.entries()){
  if(kind==='pages'){
   if(sIndex===0)s.artwork=p.backgrounds?.find(x=>x.src.includes('patern'))?.src;
   continue;
  }
  const{document:d}=parseHTML('<html><body>'+fs.readFileSync('src/templates/'+s.template+'.html','utf8')+'</body></html>');
  const root=d.body.firstElementChild;const rootClass=[...root.classList].find(c=>/^dt-element-[a-z0-9]+$/.test(c));
  let artwork='';
  if(rootClass)for(const m of css.matchAll(/([^{}]+)\{([^{}]+)\}/g))if(m[1].includes('.'+rootClass)&&m[2].includes('background-image')){
   const bg=m[2].match(/background-image:\s*url\("(\/media\/[^"]+)"\)/);if(bg&&!artwork)artwork=bg[1];
  }
  s.surface=kind==='legal'?'light':sIndex===0?'dark':sIndex%4===2?'dark':sIndex%2?'light':'soft';
  s.layout=kind==='legal'?'flow':sIndex===0&&s.images.length?'split':s.images.length===1&&!s.forms.length?'split':s.texts.length<8?'statement':'flow';
  if(artwork)s.artwork=artwork;
 }
 fs.writeFileSync(path,JSON.stringify(p,null,2)+'\n');
}
