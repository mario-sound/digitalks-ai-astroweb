const toggle=document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation=document.querySelector<HTMLElement>('#site-navigation');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation?.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.setAttribute('aria-expanded','false');navigation?.classList.remove('open');toggle.focus()}});
// Native media controls provide keyboard, progress, volume and mobile support.
document.querySelectorAll<HTMLAudioElement>('audio').forEach(audio=>{
 audio.addEventListener('play',()=>document.querySelectorAll<HTMLAudioElement>('audio').forEach(other=>{if(other!==audio)other.pause()}));
 const showError=()=>{const status=audio.parentElement?.querySelector<HTMLElement>('.audio-error');if(status)status.hidden=false};
 audio.addEventListener('error',showError);audio.querySelector('source')?.addEventListener('error',showError);
});
document.querySelectorAll<HTMLFormElement>('form[data-unconfigured]').forEach(form=>form.addEventListener('submit',e=>e.preventDefault()));
const dialog=document.querySelector<HTMLDialogElement>('#consent-dialog');
const key='digitalks-consent-v1';
let consent:string|null=null;try{consent=localStorage.getItem(key)}catch{}
document.querySelectorAll('.consent-open').forEach(el=>el.addEventListener('click',()=>dialog?.showModal()));
if(!consent)dialog?.showModal();
// Official Sender SDK bootstrap. IDs remain empty until copied from the real account.
function loadSender(){
 loadAnalytics();
 const account=document.body.dataset.senderAccount;
 if(!account||!document.querySelector('[data-sender-form-id]')||document.querySelector('#sender-sdk'))return;
 const w=window as typeof window&{Sender?:string;sender?:((...args:unknown[])=>void)&{q?:unknown[][];l?:number}};
 w.Sender='sender';w.sender=w.sender||function(...args:unknown[]){w.sender!.q=w.sender!.q||[];w.sender!.q.push(args)};w.sender.l=Date.now();w.sender(account);
 const script=document.createElement('script');script.id='sender-sdk';script.src='https://cdn.sender.net/accounts_resources/universal.js';script.async=true;document.head.append(script);
}
if(consent==='optional')loadSender();
document.querySelectorAll<HTMLButtonElement>('[data-consent]').forEach(button=>button.addEventListener('click',()=>{const next=button.dataset.consent!;try{localStorage.setItem(key,next)}catch{}dialog?.close();if(next==='optional')loadSender();else if(consent==='optional')location.reload();consent=next}));
// Exported FAQs use small local handlers instead of their former plugin runtime.
document.querySelectorAll<HTMLAnchorElement>('.ekit-accordion--toggler').forEach(button=>{
 const panel=document.getElementById(button.getAttribute('aria-controls')||'');if(!panel)return;
 function togglePanel(){const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));panel!.classList.toggle('show',open);button.closest('.elementskit-card')?.classList.toggle('active',open)}
 button.addEventListener('click',e=>{e.preventDefault();togglePanel()});
 button.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();togglePanel()}if(e.key==='Escape'){button.setAttribute('aria-expanded','false');panel.classList.remove('show')}});
});
// Scroll-snap preserves the original carousel cards, without an autoplay dependency.
document.querySelectorAll<HTMLElement>('.dt-widget-n-carousel').forEach(widget=>{
 const track=widget.querySelector<HTMLElement>('.swiper-wrapper');if(!track)return;
 const move=(direction:number)=>track.scrollBy({left:direction*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 widget.querySelectorAll<HTMLElement>('.dt-swiper-button').forEach(button=>{
 const direction=button.classList.contains('dt-swiper-button-next')?1:-1;
 button.addEventListener('click',()=>move(direction));button.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();move(direction)}});
 });
});
let pendingVideo:HTMLButtonElement|undefined;
function playVideo(button:HTMLButtonElement){
 const iframe=document.createElement('iframe');iframe.src=button.dataset.videoSrc!;iframe.title=button.getAttribute('aria-label')||'YouTube';iframe.allow='autoplay; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;button.replaceWith(iframe);
}
document.querySelectorAll<HTMLButtonElement>('[data-video-src]').forEach(button=>button.addEventListener('click',()=>{
 if(consent==='optional')playVideo(button);else{pendingVideo=button;dialog?.showModal()}
}));
document.querySelector('[data-consent="optional"]')?.addEventListener('click',()=>{if(pendingVideo){playVideo(pendingVideo);pendingVideo=undefined}});
// Use the publicly declared entrance names/delays, respecting reduced motion.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target as HTMLElement;const name=el.dataset.entrance||'fadeIn';
  const from:Keyframe={opacity:0};
  if(name.includes('Up'))from.transform='translateY(24px)';
  if(name.includes('Down'))from.transform='translateY(-24px)';
  if(name.includes('Left'))from.transform='translateX(-24px)';
  if(name.includes('Right'))from.transform='translateX(24px)';
  if(name.startsWith('zoom'))from.transform=(from.transform||'')+' scale(.92)';
  el.animate([from,{opacity:1}],{duration:700,delay:Math.min(Number(el.dataset.entranceDelay)||0,800),easing:'ease-out'});
  observer.unobserve(el);
 }),{threshold:.08});
 document.querySelectorAll('[data-entrance]').forEach(el=>observer.observe(el));
}

function loadAnalytics(){
 const id=document.body.dataset.gtmId;
 if(!id||!/^GTM-[A-Z0-9]+$/.test(id)||document.getElementById('gtm-sdk'))return;
 const w=window as typeof window&{dataLayer?:Record<string,unknown>[]};
 w.dataLayer=w.dataLayer||[];w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
 const script=document.createElement('script');script.id='gtm-sdk';script.async=true;script.src='https://www.googletagmanager.com/gtm.js?id='+id;document.head.append(script);
}
