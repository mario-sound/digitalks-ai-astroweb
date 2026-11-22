import fs from 'node:fs';import {parseHTML}from'linkedom';
const assets=JSON.parse(fs.readFileSync('docs/original/asset-map.json'));const map=new Map(assets.map(a=>[a.url,a]));
const local=(u,base)=>{if(u.startsWith('data:')||u.startsWith('#'))return u;try{return map.get(new URL(u.replaceAll('&amp;','&'),base).href)?.served||u}catch{return u}};
const css=(text,base)=>text.replace(/url\(\s*(['"]?)([^'"\s)]+)\1\s*\)/g,(_,q,u)=>`url("${local(u,base)}")`).replaceAll('elementor','dt').replaceAll('wp-content','source-content');
for(const kind of ['pages','services','legal'])for(const file of fs.readdirSync('content/'+kind)){
 const p=JSON.parse(fs.readFileSync('content/'+kind+'/'+file));const{document:d}=parseHTML(fs.readFileSync('docs/original/'+p.id+'.html','utf8'));let result='';
 for(const el of d.querySelectorAll('head link[rel="stylesheet"],head style')){
  if(el.tagName==='STYLE'){
   if(el.id.includes('rocket-lazyload')||el.textContent.includes('.e-con.e-parent:nth-of-type'))continue;
   result+=css(el.textContent,p.source)+'\n';
  }else{
   const a=map.get(el.href);if(!a)continue;
   if(el.href.includes('complianz')||el.href.includes('polylang')||el.href.includes('sticky-header'))continue;
   // Recover cached original CSS from audit download when kept, otherwise rehydrate it separately.
   const sourcePath='docs/original/styles/'+a.local.split('/').pop();
   if(!fs.existsSync(sourcePath))throw Error('Missing archived style '+a.url);
   result+=css(fs.readFileSync(sourcePath,'utf8'),a.url)+'\n';
  }
 }
 for(const el of d.querySelectorAll('[data-elementor-type="wp-page"] style'))result+=css(el.textContent,p.source)+'\n';
 fs.writeFileSync('src/templates/'+p.css,result);
}
