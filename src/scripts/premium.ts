// Progressive enhancement: all essential content and native media work without JS.
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const root=document.documentElement;
const running=new Set<Animation>();
const banners=document.querySelectorAll<HTMLElement>('.b2b-experience');
function setMotion(){
 root.classList.toggle('motion-ready',!preference.matches);
 if(preference.matches){running.forEach(animation=>animation.cancel());running.clear();}
 banners.forEach(b=>{const button=b.querySelector<HTMLButtonElement>('.motion-toggle');if(button)button.hidden=preference.matches;});
}
setMotion();preference.addEventListener('change',setMotion);
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const el=entry.target as HTMLElement;
  if(el.matches('.b2b-experience,.production-timeline')){el.classList.toggle('in-view',entry.isIntersecting);return;}
  if(!entry.isIntersecting)return;
  observer.unobserve(el);
  if(preference.matches||!el.animate)return;
  const tokens=getComputedStyle(root);
  const distance=tokens.getPropertyValue('--motion-distance').trim()||'18px';
  const duration=parseFloat(tokens.getPropertyValue('--motion-entry'))||620;
  const easing=tokens.getPropertyValue('--motion-ease').trim()||'ease-out';
  const animation=el.animate([{opacity:.45,transform:`translateY(${distance})`},{opacity:1,transform:'translateY(0)'}],{duration,easing});
  running.add(animation);animation.onfinish=()=>running.delete(animation);
 }),{threshold:.12});
 document.querySelectorAll('[data-reveal],.b2b-experience').forEach(el=>observer.observe(el));
}
banners.forEach(b=>{
 const button=b.querySelector<HTMLButtonElement>('.motion-toggle');
 button?.addEventListener('click',()=>{const paused=b.classList.toggle('motion-paused');button.setAttribute('aria-pressed',String(paused));button.textContent=paused?button.dataset.resumeLabel!:button.dataset.pauseLabel!;});
});
// Native constraints remain available; inline feedback never changes submission status.
document.querySelectorAll<HTMLFormElement>('.compact-form').forEach(form=>{
 const input=form.querySelector<HTMLInputElement>('input[type=email]');
 const error=form.querySelector<HTMLElement>('.field-error');
 const update=()=>{if(!input||!error)return;const invalid=!input.validity.valid;input.setAttribute('aria-invalid',String(invalid));error.hidden=!invalid;};
 input?.addEventListener('blur',update);input?.addEventListener('invalid',update);
 input?.addEventListener('input',()=>{if(input.getAttribute('aria-invalid')==='true')update();});
});
const clock=(time:number)=>Number.isFinite(time)?`${Math.floor(time/60)}:${String(Math.floor(time%60)).padStart(2,'0')}`:'—';
document.querySelectorAll<HTMLElement>('.audio-player').forEach(player=>{
 const audio=player.querySelector<HTMLAudioElement>('audio');
 const controls=player.querySelector<HTMLElement>('.audio-controls');
 const play=player.querySelector<HTMLButtonElement>('.audio-play');
 const seek=player.querySelector<HTMLInputElement>('.audio-seek');
 const time=player.querySelector<HTMLElement>('.audio-time');
 const mute=player.querySelector<HTMLButtonElement>('.audio-mute');
 if(!audio||!controls||!play||!seek||!time||!mute)return;
 controls.hidden=false;player.classList.add('enhanced-audio');
 const update=()=>{
  const playing=!audio.paused&&!audio.ended;
  player.classList.toggle('is-playing',playing);
  player.closest('article')?.classList.toggle('demo-playing',playing);
  play.setAttribute('aria-label',(playing?play.dataset.pauseLabel:play.dataset.playLabel)!);
  play.classList.toggle('is-playing',playing);
  const duration=audio.duration;seek.disabled=!Number.isFinite(duration)||duration<=0;
  seek.value=String(seek.disabled?0:audio.currentTime/duration*100);
  seek.setAttribute('aria-valuetext',`${clock(audio.currentTime)} / ${clock(duration)}`);
  seek.style.setProperty('--progress',seek.value+'%');
  time.textContent=`${clock(audio.currentTime)} / ${clock(duration)}`;
 };
 for(const event of ['play','pause','ended','loadedmetadata','timeupdate','durationchange','error'])audio.addEventListener(event,update);
 play.addEventListener('click',async()=>{
  if(!audio.paused){audio.pause();return;}
  play.disabled=true;
  try{await audio.play();}catch{const error=player.querySelector<HTMLElement>('.audio-error');if(error)error.hidden=false;}finally{play.disabled=false;update();}
 });
 seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number(seek.value)/100*audio.duration;update();});
 mute.addEventListener('click',()=>{audio.muted=!audio.muted;mute.setAttribute('aria-pressed',String(audio.muted));mute.classList.toggle('is-muted',audio.muted);});
 update();
});
// Real screenshot enlargement; anchors still open the asset with JavaScript disabled.
document.querySelectorAll<HTMLElement>('[data-screen-gallery]').forEach(gallery=>{
 const dialog=gallery.querySelector<HTMLDialogElement>('dialog');
 const image=gallery.querySelector<HTMLImageElement>('[data-lightbox-image]');
 const caption=gallery.querySelector<HTMLElement>('[data-lightbox-caption]');
 if(!dialog||!image||!caption||!dialog.showModal)return;
 let trigger:HTMLElement|undefined;
 gallery.querySelectorAll<HTMLAnchorElement>('[data-screen-link]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();trigger=link;image.src=link.href;image.alt=link.dataset.alt||'';caption.textContent=link.dataset.caption||'';dialog.showModal();
 }));
 const scale=gallery.querySelector<HTMLButtonElement>('[data-scale-screen]');
 scale?.addEventListener('click',()=>{const native=dialog.classList.toggle('native-scale');scale.setAttribute('aria-pressed',String(native));scale.textContent=native?scale.dataset.fitLabel!:scale.dataset.originalLabel!;});
 gallery.querySelector('[data-close-screen]')?.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{dialog.classList.remove('native-scale');if(scale){scale.setAttribute('aria-pressed','false');scale.textContent=scale.dataset.originalLabel!;}trigger?.focus();});
});
// Low-intensity response to the user's pointer; no scroll hijacking or touch tracking.
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll<HTMLElement>('.b2b-hero-art').forEach(art=>{
 let frame=0;
 art.addEventListener('pointermove',event=>{
  if(preference.matches||!finePointer.matches)return;
  cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const box=art.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5;const y=(event.clientY-box.top)/box.height-.5;art.style.setProperty('--tilt-x',`${-y*4}deg`);art.style.setProperty('--tilt-y',`${x*5}deg`);art.style.setProperty('--shift-x',`${x*8}px`);art.style.setProperty('--shift-y',`${y*6}px`);});
 });
 art.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);for(const key of ['--tilt-x','--tilt-y','--shift-x','--shift-y'])art.style.removeProperty(key);});
});
