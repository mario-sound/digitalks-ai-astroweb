import fs from 'node:fs';import {parseHTML} from 'linkedom';
const audit=JSON.parse(fs.readFileSync('docs/original/audit.json'));const assets=JSON.parse(fs.readFileSync('docs/original/asset-map.json'));
const videos=[];
for(const kind of ['pages','services','legal'])for(const file of fs.readdirSync('content/'+kind)){
 const path='content/'+kind+'/'+file;const page=JSON.parse(fs.readFileSync(path));const {document:original}=parseHTML(fs.readFileSync('docs/original/'+page.id+'.html','utf8'));
 for(const s of page.sections){
  for(const link of s.links)if(link.href.startsWith('#collapse-'))link.href=link.href.replace('#collapse-','#Collapse-');
  let template='src/templates/'+s.template+'.html';const {document:d}=parseHTML('<html><body>'+fs.readFileSync(template,'utf8')+'</body></html>');
  for(const summary of d.querySelectorAll('summary')){summary.removeAttribute('aria-expanded');summary.removeAttribute('aria-controls');}
  s.videos=[];
  for(const widget of d.querySelectorAll('.dt-widget-video')){
   const id=[...widget.classList].find(x=>x.startsWith('dt-element-')&&x!=='dt-element')?.replace('dt-element-','');
   const source=original.querySelector(`[data-id="${id}"]`);const settings=JSON.parse(source?.getAttribute('data-settings')||'{}');
   if(!settings.youtube_url)continue;
   const video={key:'video-'+s.videos.length,url:settings.youtube_url,poster:assets.find(a=>a.url===settings.image_overlay?.url)?.served||'',label:page.lang==='en'?'Play video':'Reproducir vídeo'};
   s.videos.push(video);videos.push({page:page.path,...video});widget.innerHTML=`<div data-video-slot="${video.key}"></div>`;
  }
  fs.writeFileSync(template,d.body.innerHTML);
 }
 fs.writeFileSync(path,JSON.stringify(page,null,2)+'\n');
}
fs.writeFileSync('docs/original/videos.json',JSON.stringify(videos,null,2)+'\n');
console.log('Recovered',videos.length,'YouTube videos from public widget settings');
