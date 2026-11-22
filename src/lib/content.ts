export interface TextField {key:string;label:string;value:string}
export interface ImageField {key:string;src:string;alt:string}
export interface LinkField {key:string;label:string;href:string}
export interface Video {key:string;url:string;poster:string;label:string}
export interface Section {kind?:string;eyebrow?:string;items?:{title:string;body:string}[];heroMetrics?:{title:string;body:string}[];demoIds?:string[];characterLabel?:string;multilingualLabel?:string;note?:string;caption?:string;email?:string;surface?:'light'|'soft'|'dark'|'brand';layout?:'flow'|'split'|'cards'|'demos'|'logos'|'statement'|'hero';artwork?:string;actions?:{label:string;href:string}[];featuredDemos?:string[];language?:string;videos?:Video[]; id?:string; label?:string; template?:string; enabled?:boolean; texts?:TextField[]; images?:ImageField[]; links?:LinkField[]; forms?:{slot:string;form:string}[]; type?:string; heading?:string; body?:string; image?:string; alt?:string; demo?:string; form?:string; }
export interface Page {commercial?:boolean;design?:boolean;id:string;title:string;path:string;lang:'es'|'en';seo:string;source?:string;bodyClass?:string;rootClass?:string;styles?:string[];css?:string;backgrounds?:{original:string;src:string}[];sections:Section[]}
export interface Demo {id:string;title:string;character:string;language:string;audio:string;image:string;source:string;order:number}
export interface Field {showLabel?:boolean;width?:string;name:string;label:string;type:string;required:boolean;placeholder:string;options:{label:string;value:string}[]}
export interface Form {id:string;title:string;lang:string;source:string;fields:Field[];submit:string;status:string;senderFormId:string;notice:string}
export interface Seo {id:string;title:string;description:string;canonical:string;alternates:{lang:string;path:string}[];image:string}
// Static JSON imports let Vite observe CMS edits and new files during local development.
const contentFiles=import.meta.glob('../../content/**/*.json',{eager:true,import:'default'});
export function read<T>(file:string):T {
 const value=contentFiles['../../'+file];
 if(value===undefined)throw Error('Missing content file '+file);
 return value as T;
}
export function collection<T>(name:string):T[]{
 const prefix='../../content/'+name+'/';
 return Object.entries(contentFiles).filter(([key])=>key.startsWith(prefix)&&!key.slice(prefix.length).includes('/')).sort(([a],[b])=>a.localeCompare(b)).map(([,value])=>value as T);
}
export const pages = ['pages','services','legal'].flatMap(n=>collection<Page>(n)).map(page=>({...page,design:page.design!==false}));
export const characters=collection<{id:string;title:string;image:string}>('characters');
export const demos=collection<Demo>('demos');
export const forms=collection<Form>('forms');
export const seo=collection<Seo>('seo');
export const general=read<{title:string;url:string;logo:string;preview:boolean;senderAccountId:string;senderEnabled:boolean;gtmId:string;analyticsEnabled:boolean;searchConsoleVerification:string}>('content/settings/general.json');
export const nav=read<Record<string,{label:string;href:string}[]>>('content/settings/navigation.json');
export const footer=read<Record<string,{copyright:string;credit:string;links:{label:string;href:string}[];unlinked:string}>>('content/settings/footer.json');
export const languages=collection<{id:string;title:string;home:string;formError:string}>('languages');

export const ui=read<Record<string,Record<string,string>>>('content/settings/ui.json');
