import {general} from '../lib/content';
export function GET(){return new Response(`User-agent: *\nDisallow: ${general.preview?'/':''}\n${general.preview?'':`Sitemap: ${general.url}/sitemap.xml\n`}`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
