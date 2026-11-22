import { defineConfig } from 'astro/config';
import {readFileSync} from 'node:fs';
const redirects=JSON.parse(readFileSync(new URL('./content/settings/redirects.json',import.meta.url))); 
export default defineConfig({
  redirects: Object.fromEntries(Object.entries(redirects).map(([from,to])=>[from,{status:301,destination:to}])),
  devToolbar: { enabled: false },
  site: 'https://digitalks-ai.com', output: 'static', trailingSlash: 'always',
  i18n: { defaultLocale: 'es', locales: ['es', 'en'], routing: { prefixDefaultLocale: false } },
  build: { format: 'directory' },
});
