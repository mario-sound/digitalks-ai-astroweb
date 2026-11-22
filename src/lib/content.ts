import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
export interface TextField {key:string;label:string;value:string}
export interface ImageField {key:string;src:string;alt:string}
export interface LinkField {key:string;label:string;href:string}
export interface Video {key:string;url:string;poster:string;label:string}
export interface Section {language?:string;videos?:Video[]; id?:string; label?:string; template?:string; enabled?:boolean; texts?:TextField[]; images?:ImageField[]; links?:LinkField[]; forms?:{slot:string;form:string}[]; type?:string; heading?:string; body?:string; image?:string; alt?:string; demo?:string; form?:string; }
export interface Page {id:string;title:string;path:string;lang:'es'|'en';seo:string;source?:string;bodyClass?:string;rootClass?:string;styles?:string[];css?:string;backgrounds?:{original:string;src:string}[];sections:Section[]}
export interface Demo {id:string;title:string;character:string;language:string;audio:string;image:string;source:string;order:number}
export interface Field {showLabel?:boolean;width?:string;name:string;label:string;type:string;required:boolean;placeholder:string;options:{label:string;value:string}[]}
export interface Form {id:string;title:string;lang:string;source:string;fields:Field[];submit:string;status:string;senderFormId:string;notice:string}
export interface Seo {id:string;title:string;description:string;canonical:string;alternates:{lang:string;path:string}[];image:string}
export function read<T>(file:string):T {return JSON.parse(readFileSync(join(process.cwd(),file),'utf8')) as T}
export function collection<T>(name:string):T[]{return readdirSync(join(process.cwd(),'content',name)).filter(x=>x.endsWith('.json')).map(x=>read<T>(`content/${name}/${x}`))}
export const pages = ['pages','services','legal'].flatMap(n=>collection<Page>(n));
export const demos=collection<Demo>('demos');
export const forms=collection<Form>('forms');
export const seo=collection<Seo>('seo');
export const general=read<{title:string;url:string;logo:string;preview:boolean;senderAccountId:string;senderEnabled:boolean;gtmId:string;analyticsEnabled:boolean;searchConsoleVerification:string}>('content/settings/general.json');
export const nav=read<Record<string,{label:string;href:string}[]>>('content/settings/navigation.json');
export const footer=read<Record<string,{copyright:string;credit:string;links:{label:string;href:string}[];unlinked:string}>>('content/settings/footer.json');
export const languages=collection<{id:string;title:string;home:string;formError:string}>('languages');

export const ui=read<Record<string,Record<string,string>>>('content/settings/ui.json');
