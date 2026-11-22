import {parseHTML} from 'linkedom';
import {readFileSync} from 'node:fs';
import {renderSection} from './render';
import type {Page,Section} from './content';

// The original data/templates remain the editorial source. Presentation is applied
// at build time, without shipping a DOM parser or legacy page CSS to the browser.
const typographyCache=new Map<string,Map<string,string>>();
function typography(cssFile?:string){
 if(!cssFile)return new Map<string,string>();
 if(typographyCache.has(cssFile))return typographyCache.get(cssFile)!;
 const result=new Map<string,string>();
 const css=readFileSync('src/templates/'+cssFile,'utf8');
 for(const m of css.matchAll(/([^{}]+)\{([^{}]+)\}/g)){
  const family=m[2].includes('Playfair Display')?'font-editorial':m[2].includes('Space Mono')?'font-mono':undefined;
  if(!family||!m[2].includes('font-family'))continue;
  for(const selector of m[1].split(',')){const ids=[...selector.matchAll(/\.dt-element-([a-z0-9]+)/g)];if(ids.length)result.set(ids.at(-1)![1],family);}
 }
 typographyCache.set(cssFile,result);return result;
}
export function sectionDocument(section:Section,lang:string){return parseHTML('<html><body>'+renderSection(section,lang)+'</body></html>').document;}
export function renderPresentation(section:Section,lang:string,page?:Page){
 const d=sectionDocument(section,lang);const root=d.body.firstElementChild as HTMLElement|null;if(!root)return '';
 const legal=!!page?.path.match(/politica|privacy/);
 // Keep emphasis/colors and font families, remove fixed sizes and positioning.
 for(const el of [root,...Array.from(root.querySelectorAll<HTMLElement>('*'))]){
  const style=el.getAttribute('style')||'';
  if(/(?:color|background[^:]*):\s*#(?:f45d0e|d56437|da6331|dd6a34)/i.test(style))el.classList.add('accent-orange');
  if(/color:\s*#(?:ffd113|f8d849|f7d84c)/i.test(style)||el.matches('.remark,.remark-header'))el.classList.add('accent-yellow');
  if(/font-family[^;]*Playfair/i.test(style))el.classList.add('font-editorial');
  if(/font-family[^;]*Space/i.test(style))el.classList.add('font-mono');
  if(/font-weight:\s*(700|bold)/i.test(style))el.classList.add('weight-bold');
  el.removeAttribute('style');
  if(el.tagName==='FONT'){
   const color=el.getAttribute('color')||'';el.classList.add(/^#(f45d0e|d56437|da6331)/i.test(color)?'accent-orange':'accent-yellow');el.removeAttribute('color');
  }
 }
 for(const[id,family]of typography(page?.css)){root.querySelector('.dt-element-'+id)?.classList.add(family);}
 for(const el of root.querySelectorAll('.dt-widget-spacer,.dt-spacer,.dt-background-overlay'))el.remove();
 for(const grid of root.querySelectorAll<HTMLElement>('.e-grid')){
  const children=Array.from(grid.children) as HTMLElement[];
  if(children.length<2)continue;
  grid.classList.add(children.some(c=>c.querySelector('audio'))?'character-grid':'content-grid');
  grid.style.setProperty('--columns',String(Math.min(children.length,3)));
  for(const child of children)child.classList.add(child.querySelector('.dtp2-player')?'language-group':child.querySelector('audio')?'character-card':'content-card');
 }
 // Existing multilingual cards have one image and multiple flag/player rows.
 for(const group of root.querySelectorAll<HTMLElement>('.e-con')){
  if(group.querySelectorAll('.dtp2-player').length===5&&Array.from(group.children).some(c=>c.classList.contains('dt-widget-html'))){group.classList.add('language-card');}
 }
 for(const group of root.querySelectorAll<HTMLElement>('.dt-container')){
  const columns=Array.from(group.children).filter(c=>c.classList.contains('dt-column'));
  if(columns.length>1){group.classList.add('column-layout');group.style.setProperty('--columns',String(Math.min(columns.length,3)));}
 }
 if(section.layout==='logos')for(const group of root.querySelectorAll<HTMLElement>('.e-con-inner,.dt-widget-wrap')){
  if(group.querySelectorAll('img').length>3)group.classList.add('logo-layout');
 }
 // Consecutive display fragments form one visual headline instead of isolated posters.
 for(const parent of Array.from(root.querySelectorAll('.e-con,.e-con-inner,.dt-widget-wrap'))){
  const children=Array.from(parent.children);let run:Element[]=[];
  const flush=()=>{if(run.length>1){const cluster=d.createElement('div');cluster.className='headline-cluster';run[0].before(cluster);for(const node of run)cluster.append(node);}run=[];};
  for(const child of children){if(child.classList.contains('dt-widget-heading')&&child.querySelector('h1,h2,h3')&&!child.querySelector('[hidden]'))run.push(child);else flush();}flush();
 }
 root.classList.add('design-section','tone-'+(section.surface||'light'),'layout-'+(section.layout||'flow'));
 if(legal)root.classList.add('legal-section');
 if(section.id)root.setAttribute('data-section',section.id);
 const shell=d.createElement('div');shell.className='section-shell';
 while(root.firstChild)shell.append(root.firstChild);root.append(shell);
 if(section.layout==='split'){
  const widget=shell.querySelector('.dt-widget-image');
  const image=widget?.querySelector('img');
  if(widget&&image){
   const copy=d.createElement('div');copy.className='split-copy';const art=d.createElement('aside');art.className='split-art';art.append(widget);
   while(shell.firstChild)copy.append(shell.firstChild);shell.append(copy,art);
  }
 }
 // Empty optional artwork/CTA fields leave the original section intact.
 if(section.artwork&&!shell.querySelector('img')){
  const art=d.createElement('div');art.className='section-artwork';
  const img=d.createElement('img');img.src=section.artwork;img.alt='';img.loading='lazy';art.append(img);
  const copy=d.createElement('div');copy.className='split-copy';while(shell.firstChild)copy.append(shell.firstChild);shell.append(copy,art);root.classList.add('has-artwork');
 }
 return root.outerHTML;
}
