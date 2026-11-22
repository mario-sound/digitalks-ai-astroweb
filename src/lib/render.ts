import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import { demos, forms, general, languages, type Section, type Demo, type Form } from './content';
export const escape=(s:unknown)=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function safeUrl(s:string):string {
 if(s.startsWith('//')||/[\u0000-\u0020]/.test(s))throw Error('Invalid URL');
 if(/^(https:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(s))return escape(s);
 throw Error('Unsafe or non-HTTPS URL: '+s);
}
export function audioMarkup(demo:Demo,lang:string){
 const error=languages.find(x=>x.id===lang)?.formError||'Audio unavailable';
 return `<div class="audio-player"><audio class="dt-player__audio" controls preload="none" aria-label="${escape(demo.title+' · '+demo.language)}" data-demo="${escape(demo.id)}"><source src="${safeUrl(demo.audio)}" type="audio/mpeg"><a href="${safeUrl(demo.audio)}">${escape(demo.title)}</a></audio><p class="audio-error" role="status" hidden>${escape(error)} <a href="${safeUrl(demo.audio)}">${escape(demo.title)}</a></p></div>`;
}
export function formMarkup(form:Form){
 if(general.senderEnabled&&general.senderAccountId&&form.status==='configured'&&form.senderFormId){
  return `<div class="sender-form-field" data-sender-form-id="${escape(form.senderFormId)}"></div>`;
 }
 const id=escape(form.id);
 return `<form class="dt-form migration-form" data-unconfigured aria-describedby="${id}-notice">${form.fields.map((f,i)=>{
 if(f.type==='heading')return `<p class="form-heading">${escape(f.label)}</p>`;
 const fid=id+'-'+i;
 const common=`id="${fid}" name="${escape(f.name)}" ${f.required?'required':''} placeholder="${escape(f.placeholder)}"`;
 const field=f.type==='textarea'?`<textarea ${common}></textarea>`:f.type==='select'?`<select ${common}>${f.options.map(x=>`<option value="${escape(x.value)}">${escape(x.label)}</option>`).join('')}</select>`:`<input type="${['email','text','tel','url','checkbox','number','date'].includes(f.type)?f.type:'text'}" ${common} ${f.type==='email'?'autocomplete="email"':''}>`;
 return `<div class="dt-field-group ${f.width==='half'?'field-half':'field-full'}"><label ${f.showLabel===false?'class="screen-reader-label"':''} for="${fid}">${escape(f.label)}</label>${field}</div>`;
 }).join('')}<button type="submit" disabled>${escape(form.submit)}</button><p class="form-notice" id="${id}-notice">${escape(form.notice)}</p></form>`;
}
export function renderSection(section:Section,lang:string){
 if(section.enabled===false)return '';
 if(!section.template)return '';
 if(!/^[a-zA-Z0-9_-]+$/.test(section.template))throw Error('Invalid template');
 let html=readFileSync(join(process.cwd(),'src/templates',section.template+'.html'),'utf8');
 const values=new Map<string,string>();
 for(const text of section.texts||[])values.set(text.key+':value',escape(text.value));
 for(const image of section.images||[]){values.set(image.key+':src',image.src?safeUrl(image.src):'');values.set(image.key+':alt',escape(image.alt));}
 for(const link of section.links||[])values.set(link.key+':href',safeUrl(link.href||'#'));
 html=html.replace(/\{\{([^}]+)\}\}/g,(_,key)=>{if(!values.has(key))throw Error('Missing content '+key+' in '+section.template);return values.get(key)!});
 html=html.replace(/<img\b[^>]*\bsrc=""[^>]*>/g,'');
 html=html.replace(/<div data-audio-slot="([^"]+)"><\/div>/g,(_,id)=>{const demo=demos.find(d=>d.id===id);if(!demo)throw Error('Missing demo '+id);return audioMarkup(demo,lang)});
 html=html.replace(/<div data-video-slot="([^"]+)"><\/div>/g,(_,key)=>{
 const video=section.videos?.find(v=>v.key===key);if(!video)throw Error('Missing video '+key);
 if(!video.url)return '';
 const u=new URL(video.url);const id=u.hostname==='youtu.be'?u.pathname.slice(1):u.searchParams.get('v');
 if(!id||!/^[a-zA-Z0-9_-]{11}$/.test(id))throw Error('Invalid YouTube ID');
 return `<figure class="external-video"><button type="button" data-video-src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" aria-label="${escape(video.label)}">${video.poster?`<img src="${safeUrl(video.poster)}" alt="" loading="lazy">`:''}<span>${escape(video.label)}</span></button><figcaption><a href="${safeUrl(video.url)}" target="_blank" rel="noopener noreferrer">YouTube</a></figcaption></figure>`;
 });
 html=html.replace(/<div data-form-slot="([^"]+)"><\/div>/g,(_,slot)=>{const id=section.forms?.find(f=>f.slot===slot)?.form||slot;const form=forms.find(f=>f.id===id);if(!form)throw Error('Missing form '+id);return formMarkup(form)});
 return html;
}
