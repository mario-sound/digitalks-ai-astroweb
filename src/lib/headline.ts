import {escape} from './render';
// Editorial emphasis is content, not a per-route styling rule.
export function headlineMarkup(title:string,accent?:string){
 if(!accent)return escape(title);
 const index=title.indexOf(accent);
 if(index<0)return escape(title);
 return escape(title.slice(0,index))+`<span class="heading-accent">${escape(accent)}</span>`+escape(title.slice(index+accent.length));
}
