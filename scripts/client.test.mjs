import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import ts from 'typescript';import{parseHTML}from'linkedom';
const code=ts.transpileModule(fs.readFileSync('src/scripts/client.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
function setup(route='/',choice=null){
 const{document,window}=parseHTML(fs.readFileSync('dist'+route+'index.html','utf8'));
 const saved=new Map(choice?[['digitalks-consent-v1',choice]]:[]);let reloads=0;
 const dialog=document.querySelector('dialog');dialog.showModal=()=>dialog.setAttribute('open','');dialog.close=()=>dialog.removeAttribute('open');
 for(const audio of document.querySelectorAll('audio')){audio.pause=()=>audio.dataset.paused='true';}
 const context={document,window,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},location:{reload:()=>reloads++},matchMedia:()=>({matches:true}),Date};
 vm.runInNewContext(code,context);
 return{document,window,dialog,saved,context,reloads:()=>reloads};
}
function key(window,el,value){const event=new window.Event('keydown',{bubbles:true,cancelable:true});event.key=value;el.dispatchEvent(event)}
test('mobile menu opens and Escape closes it',()=>{
 const{document:d,window:w}=setup('/','necessary');const button=d.querySelector('.menu-toggle');button.click();assert.equal(button.getAttribute('aria-expanded'),'true');assert.ok(d.querySelector('nav').classList.contains('open'));key(w,d,'Escape');assert.equal(button.getAttribute('aria-expanded'),'false');
});
test('one playing demo pauses all other demos and media errors become visible',()=>{
 const{document:d,window:w}=setup('/','necessary');const[a,b]=d.querySelectorAll('audio');a.dispatchEvent(new w.Event('play'));assert.equal(b.dataset.paused,'true');assert.equal(a.dataset.paused,undefined);a.dispatchEvent(new w.Event('error'));assert.equal(a.parentElement.querySelector('.audio-error').hidden,false);
});
test('initial consent blocks services, choice persists and can be reopened',()=>{
 const{document:d,dialog,saved}=setup();assert.ok(dialog.hasAttribute('open'));assert.equal(d.querySelectorAll('#sender-sdk').length,0);d.querySelector('[data-consent="necessary"]').click();assert.equal(saved.get('digitalks-consent-v1'),'necessary');assert.ok(!dialog.hasAttribute('open'));d.querySelector('.consent-open').click();assert.ok(dialog.hasAttribute('open'));
});
test('unconfigured form prevents native submission',()=>{
 const{document:d,window:w}=setup('/','necessary');const event=new w.Event('submit',{cancelable:true});d.querySelector('form').dispatchEvent(event);assert.ok(event.defaultPrevented);
});
